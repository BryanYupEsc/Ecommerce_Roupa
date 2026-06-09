const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

const cloudinaryService = {

  // Sube una imagen a Cloudinary y devuelve la URL
    uploadImage: async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
        method: 'POST',
        body: formData
        }
    )

    const data = await response.json()
    return data.secure_url // Esta es la URL que guardamos en la BD
    }
}

export default cloudinaryService