const config = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJETC_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionIdDorms : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_DORMS),
    appwriteCollectionIdRentals : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_RENTALS),
    appwriteCollectionIdServices : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_SERVICES),
    appwriteCollectionIdComplaints : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_COMPLAINTS),
    appwriteCollectionIdFeedbacks : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_FEEDBACKS),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default config