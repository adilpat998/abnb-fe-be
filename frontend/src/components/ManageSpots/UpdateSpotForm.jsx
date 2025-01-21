import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";
import "../CreateSpot/CreateSpotForm.css";

function UpdateSpotForm() {
  const { spotId } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchSpotData = async () => {
      try {
        const response = await csrfFetch(`/api/spots/${spotId}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            country: data.country,
            address: data.address,
            city: data.city,
            state: data.state,
            latitude: data.lat || "",
            longitude: data.lng || "",
            description: data.description,
            name: data.name,
            price: data.price,
            previewImage: data.SpotImages.find((img) => img.preview)?.url || "",
            imageUrls: data.SpotImages.filter((img) => !img.preview).map((img) => img.url).concat(["", "", "", ""]).slice(0, 4),
          });
        }
      } catch (error) {
        console.error("Failed to fetch spot data:", error);
      }
    };

    fetchSpotData();
  }, [spotId]);

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
      const spotResponse = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spotData),
      });

      if (spotResponse.ok) {
        await csrfFetch(`/api/spots/${spotId}/images`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: formData.previewImage, preview: true }),
        });

        const imageRequests = formData.imageUrls
          .filter((url) => url.trim() !== "")
          .map((url) =>
            csrfFetch(`/api/spots/${spotId}/images`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ url, preview: false }),
            })
          );

        await Promise.all(imageRequests);
        navigate(`/spots/${spotId}`); 
      } else {
        const errorData = await spotResponse.json();
        setErrors(errorData.errors || {});
      }
    } catch (error) {
      console.error("Failed to update spot:", error);
    }
  };

  return (
    <div className="create-spot-container">
      <h1>Update your Spot</h1>
      <form onSubmit={handleSubmit}>
      <h2>Where&apos;s your place located?</h2>
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

        <h2>Describe your place to guests</h2>
        <textarea name="description" value={formData.description} onChange={handleChange} />
        {errors.description && <p className="error-message">{errors.description}</p>}

        <h2>Create a title for your spot</h2>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <p className="error-message">{errors.name}</p>}

        <h2>Set a base price for your spot</h2>
        <input type="number" name="price" value={formData.price} onChange={handleChange} />
        {errors.price && <p className="error-message">{errors.price}</p>}

        <h2>Liven up your spot with photos</h2>
        <input type="text" name="previewImage" value={formData.previewImage} onChange={handleChange} />
        {errors.previewImage && <p className="error-message">{errors.previewImage}</p>}

        {formData.imageUrls.map((url, index) => (
          <input
            key={index}
            type="text"
            value={url}
            onChange={(e) => handleImageChange(index, e.target.value)}
            placeholder="Image URL"
          />
        ))}

        <button type="submit" className="create-spot-button">Update Spot</button>
      </form>
    </div>
  );
}

export default UpdateSpotForm;
