import { useState } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_URL;

function VideoDetailsForm() {
    const navigate = useNavigate();

    const categoriesList = [
        "Education", "Gaming", "Comedy", "Music", "Vlogs", "How-to",
        "Technology", "Reviews", "Fitness", "Motivation", "Food", "Travel",
        "Science", "Sports", "Beauty", "Fashion", "Finance", "Movies",
        "News", "Spirituality"
    ];
    const [signedUrl, setSignedUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isVideoUploadedBtnClicked, setIsVideoUploadedBtnClicked] = useState(false);

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
    const [isUploadDetailButtonClicked, changeIsUploadDetailButtonClicked] = useState(false);


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
        changeIsUploadDetailButtonClicked(true)
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

        const res = await fetch(`${BASE_URL}/video-details`, {
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
        }

        const result = await res.json();
        changeParsedRes(result?.msg || "");

    }

    const handleVideoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setSelectedFile(file);
        }

    const handleVideoFileUpload = async () => {
        setIsVideoUploadedBtnClicked(true)
    if (!selectedFile || !signedUrl) {
        alert("No file selected or signed URL missing.");
        return;
    }

    try {
        const res = await fetch(signedUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'video/mp4',
            },
            body: selectedFile,
        });

        if (res.ok) {
            alert('✅ Upload successful, it will take some time to go live');
            navigate("/")
        } else {
            alert('❌ Upload failed');
        }
    } catch (err) {
        console.error(err);
        alert('❌ Error uploading file');
    }
};


    return (
        <>
            {!signedUrl && <div className="bg-[#000000] min-h-[100vh] pt-[8vh] text-white max-w-[1200px] m-auto p-5">

                <div className=" h-[50vh] flex flex-col justify-center rounded-3xl border-2  mt-[10vh]   bg-[url(/images/loginPage.png)]  bg-cover">
                    <h1 className="text-5xl font-semibold text-center mt-5">Upload Video</h1>
                    <h2 className="text-center mt-5 text-blue-500 text-2xl">Step 1: Video Details</h2>
                </div>


                <form onSubmit={formSubmitted} encType="multipart/form-data" className='bg-[#181818] signupForm  m-auto  text-[20px] p-11 mt-8 rounded-3xl text-3xl ' >
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
                        className="!p-3.5"
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
                    <br /><br />
                    <select name="visibility" className="text-black bg-white rounded-[5px] py-2 px-2" value={value.visibility} onChange={handleInputChange}>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="unlisted">Unlisted</option>
                    </select>

                    <br /><br /><br />
                    Thumbnail:
                    <br /><br />
                    <input
                        type="file"
                        accept="image/*"
                        name="thumbnail"
                        onChange={handleFileChange}
                    />

                    <br />
                    <br />
                    {!isUploadDetailButtonClicked &&
                    <button type="submit" className="!bg-blue-500 font-bold text-2xl">Continue to Upload Video</button>}

                    {parsedRes && <p>{parsedRes}</p>}
                </form>
            </div>}
            {
                signedUrl && (
                    <>
                        <div className="bg-black min-h-[100vh] pt-[8vh] text-white max-w-[1200px] m-auto p-5 text-2xl">

                            <div className=" h-[300px] flex flex-col justify-center mt-[10vh] rounded-3xl border-2 mb-8">
                                <h1 className="text-5xl font-semibold text-center mt-5">Upload Video</h1>
                                <h2 className="text-center mt-5 text-blue-500">Step 2: Upload Video</h2>
                            </div>

                            Video file :
                            
                                <>
                                <input
                                    className="h-13 bg-white text-black w-full rounded-3xl p-2 pl-4 mt-4"
                                    type="file"
                                    accept="video/mp4"
                                    onChange={handleVideoFileChange}
                                />
                                <p>
                                    {selectedFile && <p>Selected: {selectedFile.name}</p>}

                                </p>
                                { !isVideoUploadedBtnClicked ?
                                <button onClick={handleVideoFileUpload} className="h-13 w-34  bg-amber-400 rounded-3xl p-2 mt-5 text-black cursor-pointer">Upload</button> : <p>Your video is being uploaded to server, pls wait......</p>
                                }
                            </>

                            
                        </div >
                    </>
                )
            }
        </>
    );
}



export { VideoDetailsForm };
