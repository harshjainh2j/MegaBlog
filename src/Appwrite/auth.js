import { Account, Client, ID } from "appwrite";
import conf from "../conf";
export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(conf.appwrite_endpoint)
      .setProject(conf.appwrite_project_id);

    this.account = new Account(this.client);
  }

 createAccount = async ({ email, password }) => {
    try {
    return await this.account.create(ID.unique(), email, password);
   
    } catch (error) {
     throw error; 
    }
  };

 getAccount = async () => {
    try {
      return  await this.account.get();
    

    } catch (error) {
      console.log("Error in getting account", error);
    }
    return null;
   
};

 loginUser=async({email,password})=>{
     try {
        return await this.account.createEmailPasswordSession(email,password)
     } catch (error) {
      throw(error)
        console.log("Error in login user", error);
     }
 };

 logoutUser=async()=>{
  try {
    return await this.account.deleteSessions();
  } catch (error) {
    console.log("Error in logout user", error);
  }
 };

};

export const authService = new AuthService();

export default authService;
