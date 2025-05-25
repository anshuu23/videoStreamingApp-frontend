import { useState } from "react";
import { useNavigate } from "react-router-dom";

function VideoDetailsForm() {
    const navigate = useNavigate();

    const categoriesList = [
        "Education", "Gaming", "Comedy", "Music", "Vlogs", "How-to",
        "Technology", "Reviews", "Fitness", "Motivation", "Food", "Travel",
        "Science", "Sports", "Beauty", "Fashion", "Finance", "Movies",
        "News", "Spirituality"
    ];
    const [signedUrl, setSignedUrl] = useState('');
    const [videoName, setVideoName] = useState('');

    const [value, changeValue] = useState({
        videoTitle: "",
        videoDescription: "",
        tags: "",
        categories: [] as string[], // now it's an array
        visibility: "public",
        language: "",
        channelName: "",
        thumbnail: null as File | null,
    });

    function handleCategoryChange(e: React.ChangeEvent<HTMLInputElement>, category: string) {
        const isChecked = e.target.checked;

        changeValue((prev) => {
            const newCategories = isChecked
                ? [...prev.categories, category]
                : prev.categories.filter((cat) => cat !== category);

            if (newCategories.length > 10) {
                alert("You can select up to 10 categories.");
                return prev;
            }

            return {
                ...prev,
                categories: newCategories,
            };
        });
    }


    const [parsedRes, changeParsedRes] = useState("");


    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        changeValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] || null;
        changeValue((prev) => ({
            ...prev,
            thumbnail: file,
        }));
    }

    async function formSubmitted(e: React.FormEvent) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", value.videoTitle);
        formData.append("description", value.videoDescription);
        formData.append("tags", value.tags);
        formData.append("categories", JSON.stringify(value.categories));
        formData.append("visibility", value.visibility);
        if (value.thumbnail) {
            formData.append("thumbnail", value.thumbnail);
        }
        const token = localStorage.getItem("token")

        const res = await fetch("http://localhost:3000/video-details", {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.status === 201) {
            alert("Video metadata submitted!");
            navigate("/upload-video");
        }
        if (res.status === 400) {
            alert("token expeired");
            localStorage.removeItem("token")
            navigate("/user/login");
        }
        let parsedRes = await res.json()
        if (parsedRes.data) {
            setSignedUrl(parsedRes.data[0]);
            setVideoName(parsedRes.data[1]);
        }

        const result = await res.json();
        changeParsedRes(result?.msg || "");

    }

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !signedUrl) return;

        const maxSizeInMB = 100; // Set your limit here
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

        if (file.size > maxSizeInBytes) {
            alert(`File is too large. Max allowed size is ${maxSizeInMB}MB.`);
            e.target.value = ""; // Clear the file input
            return;
        }

        if (file.type !== "video/mp4") {
            alert("Only MP4 files are allowed.");
            e.target.value = "";
            return;
        }

        try {
            const res = await fetch(signedUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'video/mp4',
                },
                body: file, // RAW binary data
            });

            if (res.ok) {
                alert('Upload successful');
            } else {
                alert('Upload failed');
            }
        } catch (err) {
            console.error(err);
            alert('Error uploading file');
        }
    };

    return (
        <>
            {!signedUrl && <div className="bg-black min-h-[100vh] pt-[8vh] text-white max-w-[1200px] m-auto p-5">

                <div className=" h-[300px] flex flex-col justify-center mt-[10vh] rounded-3xl border-2">
                    <h1 className="text-5xl font-semibold text-center mt-5">Upload Video</h1>
                    <h2 className="text-center mt-5 text-blue-500">Step 1: Video Details</h2>
                </div>


                <form onSubmit={formSubmitted} encType="multipart/form-data" className='container signupForm  m-auto  text-[20px] p-11 mt-8 rounded-3xl ' >
                    Title:
                    <br />
                    <input
                        type="text"
                        name="videoTitle"
                        onChange={handleInputChange}
                        placeholder="Video Title"
                        required
                    />

                    <br /><br />
                    Description:
                    <br />
                    <textarea
                        name="videoDescription"
                        onChange={handleInputChange}
                        placeholder="Video Description"
                        required
                    ></textarea>
                    <br /><br />
                    Tags:
                    <br />
                    <input
                        type="text"
                        name="tags"
                        onChange={handleInputChange}
                        placeholder="Tags (comma-separated)"
                    />

                    <br /><br />

                    <div>
                        <p>Select Categories (max 10)</p>
                        <br />
                        <div className="grid grid-cols-3">
                            {categoriesList.map((cat) => (
                                <label key={cat}>
                                    <input
                                        type="checkbox"
                                        value={cat}
                                        checked={value.categories.includes(cat)}
                                        onChange={(e) => handleCategoryChange(e, cat)}
                                        className="!h-auto !w-auto"
                                    />
                                    {cat}
                                </label>
                            ))}
                        </div>
                    </div>

                    <br /><br />
                    Visibility:
                    <select name="visibility" value={value.visibility} onChange={handleInputChange}>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="unlisted">Unlisted</option>
                    </select>

                    <br /><br />
                    Thumbnail:
                    <input
                        type="file"
                        accept="image/*"
                        name="thumbnail"
                        onChange={handleFileChange}
                    />

                    <br />
                    <br />
                    <button type="submit" className="!bg-blue-500 font-bold">Continue to Upload Video</button>

                    {parsedRes && <p>{parsedRes}</p>}
                </form>
            </div>}
            {
                signedUrl && (
                    <>
                        <div className="bg-black min-h-[100vh] pt-[8vh] text-white max-w-[1200px] m-auto p-5">

                            <div className=" h-[300px] flex flex-col justify-center mt-[10vh] rounded-3xl border-2">
                                <h1 className="text-5xl font-semibold text-center mt-5">Upload Video</h1>
                                <h2 className="text-center mt-5 text-blue-500">Step 2: Upload Video</h2>
                            </div>

                            Video file :
                            {
                                <input type="file" accept="video/mp4" onChange={handleUpload} />
                            }
                        </div >
                    </>
                )
            }
        </>
    );
}



export { VideoDetailsForm };
