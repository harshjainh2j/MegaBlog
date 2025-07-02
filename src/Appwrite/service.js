import { Client,Account,Databases,Storage, Query, ID } from "appwrite";
import conf from "../conf";
export class Service{
client= new Client();
databases;
storage;

constructor(){
this.client.setEndpoint(conf.appwrite_endpoint)
.setProject(conf.appwrite_project_id);
this.databases = new Databases(this.client);
this.storage=new Storage(this.client);
}

createPost=async({title,featuredImage,slug,content,status,userId})=>{
    try {
        return await this.databases.createDocument(conf.appwrite_db_id,conf.appwrite_collection_id,slug,{title,featuredImage,content,status,userId});
    } catch (error) {
    console.log("Error in creating post", error);
    }
}

updatePost=async(slug,{title,featuredImage,content,status,userId})=>{
    try {
        return await this.databases.updateDocument(conf.appwrite_db_id,conf.appwrite_collection_id,slug,{title,featuredImage,content,status,userId});
    } catch (error) {
        console.log("Error in updating post", error);
    }

}

deletePost=async(slug)=>{
    try {
        return await this.databases.deleteDocument(conf.appwrite_db_id,conf.appwrite_collection_id,slug);
    } catch (error) {
        console.log("Error in deleting post", error);
    }
}

getPost=async(slug)=>{
    try {
        return await this.databases.getDocument(conf.appwrite_db_id,conf.appwrite_collection_id,slug);
    } catch (error) {
        console.log("Error in getting post", error);
        
    }
}

ListPost=async(queries=[Query.equal("status","active")])=>{
    try {
        return await this.databases.listDocuments(conf.appwrite_db_id,conf.appwrite_collection_id,queries);
    } catch (error) {
        console.log("Error in listing post", error);
    }
}


//file creation 
createFile=async(file)=>{
    try{
        return await this.storage.createFile(conf.appwrite_bucket_id,ID.unique(),file);
    }catch(error){
        console.log("Error in creating file", error);
    }
}

deleteFile=async(fileId)=>{
    try{
        return await this.storage.deleteFile(conf.appwrite_bucket_id,fileId);
    }catch(error){
        console.log("Error in deleting file", error);
    }
}

//view file
getFilePreview=(fileId)=>{
    try{
        // console.log(fileId)
        if (!fileId) return "";
        return  this.storage.getFileView(conf.appwrite_bucket_id,fileId);
    }catch(error){
        console.log("Error in getting file", error);
    }
}



};


const service= new Service();
export default service