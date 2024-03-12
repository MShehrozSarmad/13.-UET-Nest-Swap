import config from "./../conf/config";
import { Client, ID, Databases, Query, Storage } from "appwrite";

export class DbService {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPostDorm({
        slug,
        title,
        userId,
        status,
        author,
        date,
        price,
        condition,
        description,
        image1,
        image2,
        image3,
        phone,
    }) {
        try {
            slug = slug.substring(0, 36).replace(/[^a-zA-Z0-9._-]/g, "");
            if (!/^[a-zA-Z0-9]/.test(slug)) {
                slug = "a" + slug.substring(1);
            }

            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionIdDorms,
                slug,
                {
                    title,
                    userId,
                    status,
                    author,
                    date,
                    price,
                    condition,
                    description,
                    image1,
                    image2,
                    image3,
                    phone,
                    // vehicle (title), userId, status(available, not available), author, date, description (additional details), image1, image2, rent(Xrs per Ytime), phone (hire button)
                    // service(title), userId, status(available, not available), author, date, description (additional details), image, price(amount + unit), phone

                    // slug, title, userId, status, author, date, description, image, phone, charges
                    // slug, title, userId, status, author, date, description, image1, image2, rent, phone
                }
            );
        } catch (error) {
            console.log("create post :: appwrite service :: error : ", error);
            throw error;
        }
    }

    async createPostRental({
        slug,
        title,
        userId,
        status,
        author,
        date,
        description,
        image1,
        image2,
        rent,
        phone,
    }) {
        try {
            slug = slug.substring(0, 36).replace(/[^a-zA-Z0-9._-]/g, "");
            if (!/^[a-zA-Z0-9]/.test(slug)) {
                slug = "a" + slug.substring(1);
            }

            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionIdRentals,
                slug,
                {
                    title,
                    userId,
                    status,
                    author,
                    date,
                    description,
                    image1,
                    image2,
                    rent,
                    phone,
                }
            );
        } catch (error) {
            console.log("create post :: appwrite service :: error : ", error);
            throw error;
        }
    }

    async createPostService({
        slug,
        title,
        userId,
        status,
        author,
        date,
        description,
        image,
        phone,
        charges,
    }) {
        try {
            slug = slug.substring(0, 36).replace(/[^a-zA-Z0-9._-]/g, "");
            if (!/^[a-zA-Z0-9]/.test(slug)) {
                slug = "a" + slug.substring(1);
            }

            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionIdServices,
                slug,
                {
                    title,
                    userId,
                    status,
                    author,
                    date,
                    description,
                    image,
                    phone,
                    charges,
                }
            );
        } catch (error) {
            console.log("create post :: appwrite service :: error : ", error);
            throw error;
        }
    }

    async updatePostDorm(slug, { date, price, phone, status, description }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionIdDorms,
                slug,
                {
                    date,
                    price,
                    phone,
                    status,
                    description,
                }
            );
        } catch (error) {
            console.log("update post :: appwrite service :: error : ", error);
            throw error;
        }
    }

    async updatePostService(
        slug,
        { date, charges, phone, status, description }
    ) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionIdServices,
                slug,
                {
                    date,
                    charges,
                    phone,
                    status,
                    description,
                }
            );
        } catch (error) {
            console.log("update post :: appwrite service :: error : ", error);
            throw error;
        }
    }

    async updatePostRental(slug, { date, rent, phone, status, description }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionIdRentals,
                slug,
                {
                    date,
                    rent,
                    phone,
                    status,
                    description,
                }
            );
        } catch (error) {
            console.log("update post :: appwrite service :: error : ", error);
            throw error;
        }
    }

    async delPostDorm(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionIdDorms,
                slug
            );
            return true;
        } catch (error) {
            console.log("delete post :: appwrite service :: error : ", error);
            throw error;
        }
    }
    async delPostRental(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionIdRentals,
                slug
            );
            return true;
        } catch (error) {
            console.log("delete post :: appwrite service :: error : ", error);
            throw error;
        }
    }
    async delPostService(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionIdServices,
                slug
            );
            return true;
        } catch (error) {
            console.log("delete post :: appwrite service :: error : ", error);
            throw error;
        }
    }

    async getPostDorm(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionIdDorms,
                slug
            );
        } catch (error) {
            console.log("get post :: appwrite service :: error : ", error);
            throw error;
        }
    }
    async getPostRental(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionIdRentals,
                slug
            );
        } catch (error) {
            console.log("get post :: appwrite service :: error : ", error);
            throw error;
        }
    }
    async getPostService(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionIdServices,
                slug
            );
        } catch (error) {
            console.log("get post :: appwrite service :: error : ", error);
            throw error;
        }
    }

    // async getPostsDorms(queries = [Query.equal('status', 'available')]) {
    //     try {
    //         return await this.databases.listDocuments(
    //             config.appwriteDatabaseId,
    //             config.appwriteCollectionIdDorms,
    //             queries
    //         )
    //     } catch (error) {
    //         console.log('get posts :: appwrite service :: error : ', error);
    //         return false;

    //     }
    // }

    async getPostsDorms() {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionIdDorms
            );
        } catch (error) {
            console.log("get posts :: appwrite service :: error : ", error);
            throw error;
        }
    }

    async getPostsRentals() {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionIdRentals
            );
        } catch (error) {
            console.log("get posts :: appwrite service :: error : ", error);
            throw error;
        }
    }

    async getPostsServices() {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionIdServices
            );
        } catch (error) {
            console.log("get posts :: appwrite service :: error : ", error);
            throw error;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("upload file :: appwrite service :: error : ", error);
            return false;
        }
    }

    async delFile(fileId) {
        try {
            await this.bucket.deleteFile(config.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log("delete file :: appwrite service :: error : ", error);
            return false;
        }
    }

    previewFile(fileId) {
        return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    }
}

const dbService = new DbService();

export default dbService;
