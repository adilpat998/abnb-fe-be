import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";
import { useSelector } from "react-redux";
import "./CreateSpotForm.css";



function CreateSpotForm() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.session.user);
  
  const [formData, setFormData] = useState({
    country: "",
    address: "",
    city: "",
    state: "",
    latitude: "",
    longitude: "",
    description: "",
    name: "",
    price: "",
    previewImage: "",
    imageUrls: ["", "", "", ""],
  });
  const [errors, setErrors] = useState({});

  // Reset the form and errors when the component unmounts
  useEffect(() => {
    return () => {
      setFormData({
        country: "",
        address: "",
        city: "",
        state: "",
        latitude: "",
        longitude: "",
        description: "",
        name: "",
        price: "",
        previewImage: "",
        imageUrls: ["", "", "", ""],
      });
      setErrors({});
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.imageUrls];
    updatedImages[index] = value;
    setFormData({ ...formData, imageUrls: updatedImages });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.description || formData.description.length < 30) {
      newErrors.description = "Description needs a minimum of 30 characters";
    }
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.previewImage) newErrors.previewImage = "Preview image is required";

    formData.imageUrls.forEach((url, index) => {
      if (url && !url.match(/\.(png|jpg|jpeg)$/)) {
        newErrors[`imageUrl${index}`] = "Image URL must end in .png, .jpg, or .jpeg";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("You must be logged in to create a spot.");
      return;
    }
  
    if (!validateForm()) return;
  
    const spotData = {
      country: formData.country,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      lat: formData.latitude ? parseFloat(formData.latitude) : null,
      lng: formData.longitude ? parseFloat(formData.longitude) : null,
      description: formData.description,
      name: formData.name,
      price: parseFloat(formData.price),
    };
  
    try {
      const spotResponse = await csrfFetch("/api/spots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spotData),
      });
  
      if (spotResponse.ok) {
        const spot = await spotResponse.json();
  
        // Handle image uploads
        const imageRequests = [
          csrfFetch(`/api/spots/${spot.id}/images`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: formData.previewImage, preview: true }),
          }),
          ...formData.imageUrls
            .filter((url) => url.trim() !== "")
            .map((url) =>
              csrfFetch(`/api/spots/${spot.id}/images`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url, preview: false }),
              })
            ),
        ];
  
        await Promise.all(imageRequests);
        navigate("/"); // Redirect to home page
      } else {
        const errorData = await spotResponse.json();
        setErrors(errorData.errors || {});
      }
    } catch (error) {
      console.error("Failed to create spot:", error);
    }
  };
  

  return (
    <div className="create-spot-container">
      <h1>Create a new Spot</h1>
      <form onSubmit={handleSubmit}>
      <h2>Where&apos;s your place located?</h2>
        <p>Guests will only get your exact address once they booked a reservation.</p>

        <label>Country</label>
        <input type="text" name="country" value={formData.country} onChange={handleChange} />
        {errors.country && <p className="error-message">{errors.country}</p>}

        <label>Street Address</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
        {errors.address && <p className="error-message">{errors.address}</p>}

        <div className="inline-inputs">
          <div>
            <label>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} />
            {errors.city && <p className="error-message">{errors.city}</p>}
          </div>
          <div>
            <label>State</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} />
            {errors.state && <p className="error-message">{errors.state}</p>}
          </div>
        </div>

        <div className="inline-inputs">
          <div>
            <label>Latitude (Optional)</label>
            <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} />
          </div>
          <div>
            <label>Longitude (Optional)</label>
            <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} />
          </div>
        </div>

        <h2>Describe your place to guests</h2>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Please write at least 30 characters"
        />
        {errors.description && <p className="error-message">{errors.description}</p>}

        <h2>Create a title for your spot</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name of your spot"
        />
        {errors.name && <p className="error-message">{errors.name}</p>}

        <h2>Set a base price for your spot</h2>
        <label>Price per night (USD)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="$ Price per night"
        />
        {errors.price && <p className="error-message">{errors.price}</p>}

        <h2>Liven up your spot with photos</h2>
        <input
          type="text"
          name="previewImage"
          value={formData.previewImage}
          onChange={handleChange}
          placeholder="Preview Image URL"
        />
        {errors.previewImage && <p className="error-message">{errors.previewImage}</p>}

        {formData.imageUrls.map((url, index) => (
          <div key={index}>
            <input
              type="text"
              value={url}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder="Image URL"
            />
            {errors[`imageUrl${index}`] && <p className="error-message">{errors[`imageUrl${index}`]}</p>}
          </div>
        ))}

        <button type="submit" className="create-spot-button">
          Create Spot
        </button>
      </form>
    </div>
  );
}

export default CreateSpotForm;
