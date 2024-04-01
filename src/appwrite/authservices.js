import conf from "../conf/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    
    async loginAccount({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log('login account :: appwrite service error :: error : ', error);
            throw error;
        }
    }
    
    async getCurrentUser() {
        try {
            return await this.account.get('current');
        } catch (error) {
            // console.log('getuser account :: appwrite service error :: error : ', error);
            throw error;
        }

        // return null;
    }

    async createVerification(){
        try {
            // console.log(this.account)
            // const link = await this.account.createVerification('http://localhost:5173/verify');
            const link = await this.account.createVerification('https://www.uetnestswap.live/verify');
            // console.log('email sent', link)
            return link;
        } catch (error) {
            throw error
        }
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            userAccount ? this.loginAccount({ email, password }) : userAccount;
            return userAccount;
        } catch (error) {
            // console.log('creating account :: appwrite service error :: error : ', error)
            throw error;
        }
    }

    async verifyAccount(id, secret){
        try {
            const verify = await this.account.updateVerification(id, secret);
            // console.log(verify);
        } catch (error) {
            throw error;
        }
    }



    async logOut() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            // console.log('logout account :: appwrite service error :: error : ', error);
            throw error;
        }
    }

}

const authService = new AuthService();

export default authService;