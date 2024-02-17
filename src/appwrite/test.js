import config from './../conf/config'
import { Client, ID, Databases, Query, Storage } from "appwrite";

export class DbService {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPostDorms({ title, slug, content, featuredImg, status, userId, author }) {
        try {
            slug = slug.substring(0, 36).replace(/[^a-zA-Z0-9._-]/g, '');
            if (!/^[a-zA-Z0-9]/.test(slug)) {
                slug = 'a' + slug.substring(1);
            }

            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionIdDorms,
                slug,
                {
                    title,
                    content,
                    featuredImg: featuredImg,
                    status,
                    userId,
                    author
                }
            )
        } catch (error) {
            console.log('create post :: appwrite service :: error : ', error);
        }
    }

    async createPostRental({ title, slug, content, featuredImg, status, userId, author }) {
        try {
            slug = slug.substring(0, 36).replace(/[^a-zA-Z0-9._-]/g, '');
            if (!/^[a-zA-Z0-9]/.test(slug)) {
                slug = 'a' + slug.substring(1);
            }

            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionIdRental,
                slug,
                {
                    title,
                    content,
                    featuredImg: featuredImg,
                    status,
                    userId,
                    author
                }
            )
        } catch (error) {
            console.log('create post :: appwrite service :: error : ', error);
        }
    }

    async createPostServices({ title, slug, content, featuredImg, status, userId, author }) {
        try {
            slug = slug.substring(0, 36).replace(/[^a-zA-Z0-9._-]/g, '');
            if (!/^[a-zA-Z0-9]/.test(slug)) {
                slug = 'a' + slug.substring(1);
            }

            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionIdServices,
                slug,
                {
                    title,
                    content,
                    featuredImg: featuredImg,
                    status,
                    userId,
                    author
                }
            )
        } catch (error) {
            console.log('create post :: appwrite service :: error : ', error);
        }
    }

    async updatePostDorms(slug, { title, content, featuredImg, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionIdDorms,
                slug,
                {
                    title,
                    content,
                    featuredImg,
                    status
                }
            )
        } catch (error) {
            console.log('update post :: appwrite service :: error : ', error);
        }
    }
    async updatePostServices(slug, { title, content, featuredImg, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionIdServices,
                slug,
                {
                    title,
                    content,
                    featuredImg,
                    status
                }
            )
        } catch (error) {
            console.log('update post :: appwrite service :: error : ', error);
        }
    }
    async updatePostRental(slug, { title, content, featuredImg, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionIdRental,
                slug,
                {
                    title,
                    content,
                    featuredImg,
                    status
                }
            )
        } catch (error) {
            console.log('update post :: appwrite service :: error : ', error);
        }
    }

    async delPostDorms(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionIdDorms,
                slug
            )
            return true;
        } catch (error) {
            console.log('delete post :: appwrite service :: error : ', error);
            return false;
        }
    }

    async delPostRental(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionIdRental,
                slug
            )
            return true;
        } catch (error) {
            console.log('delete post :: appwrite service :: error : ', error);
            return false;
        }
    }

    async delPostServices(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log('delete post :: appwrite service :: error : ', error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )

        } catch (error) {
            console.log('get post :: appwrite service :: error : ', error);
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log('get posts :: appwrite service :: error : ', error);
            return false;

        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('upload file :: appwrite service :: error : ', error);
            return false;
        }
    }

    async delFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log('delete file :: appwrite service :: error : ', error);
            return false;
        }
    }

    previewFile(fileId) {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }

}

const dbService = new DbService();

export default dbService;