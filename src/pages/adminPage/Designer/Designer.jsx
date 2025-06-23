import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import "./Design.css";
import { instance } from "../../../service/instance";

// Component to display 3D model
const ModelPreview = ({ url }) => {
  const { scene } = useGLTF(url);
  return (
    <Canvas style={{ height: "300px", marginBottom: "20px" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense fallback={<div className="loading">Loading 3D model...</div>}>
        <primitive object={scene} scale={[1, 1, 1]} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

// Component to display preview
const FilePreview = ({ url }) => {
  const [loadError, setLoadError] = useState("");
  const is3D = url.match(/\.(gltf|glb|obj|fbx)$/i);
  const isImage = url.match(/\.(jpg|jpeg|png|gif)$/i);

  if (loadError) {
    return <div className="error">{loadError}</div>;
  }

  if (is3D) {
    return <ModelPreview url={url} />;
  } else if (isImage) {
    return (
      <img
        src={url}
        alt="Preview"
        style={{ maxWidth: "100%", maxHeight: "300px", marginBottom: "20px" }}
        onError={() =>
          setLoadError("Unable to load image. Please check the URL.")
        }
      />
    );
  } else {
    return <div className="info">Unsupported file format for preview.</div>;
  }
};

const Design = () => {
  const [formData, setFormData] = useState({
    description: "",
    fileName: "",
    file: null,
    status: "ACTIVE",
  });
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [isPreviewable, setIsPreviewable] = useState(false);
  const navigate = useNavigate();

  // Check authentication and get username
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to continue");
      navigate("/admin/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(response.data.username);
      } catch (err) {
        setError("User  not found");
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
      setIsPreviewable(true);
    } else {
      setFormData({ ...formData, [name]: value });
      // Check if the file URL is previewable
      if (
        name === "fileUrl" &&
        value.match(/\.(gltf|glb|obj|fbx|jpg|jpeg|png|gif)$/i)
      ) {
        setIsPreviewable(true);
      } else {
        setIsPreviewable(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formDataToSend = new FormData();
    formDataToSend.append("description", formData.description);
    formDataToSend.append("fileName", formData.fileName);
    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }

    try {
      const response = await instance.post(
        "/api/design/create",
        formDataToSend,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Design created successfully!");
      navigate("/designs/list");
      console.log(response);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <a href="/" className="logo">
          DesignHub
        </a>
        <div className="user-info">
          <span>Hello, {username}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>
      <div className="container">
        <h2>Create New Design</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit} className="design-form">
          <div className="form-group">
            <label htmlFor="description">Design Description *</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter a detailed description of your design..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="fileName">File Name *</label>
            <input
              type="text"
              id="fileName"
              name="fileName"
              placeholder="Enter file name (e.g., model.gltf)"
              value={formData.fileName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="file">Upload File *</label>
            <input
              type="file"
              id="file"
              name="file"
              accept=".gltf,.glb,.obj,.fbx,.jpg,.jpeg,.png,.gif"
              onChange={handleChange}
              required
            />
          </div>
          {isPreviewable && formData.file && (
            <div className="form-group">
              <label>Preview</label>
              <FilePreview url={URL.createObjectURL(formData.file)} />
            </div>
          )}
          <button type="submit" className="submit-btn">
            Create Design
          </button>
        </form>
      </div>
    </>
  );
};

export default Design;
