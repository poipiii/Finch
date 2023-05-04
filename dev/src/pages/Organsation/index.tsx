import ClippedDrawer from "../../components/ClippedDrawer"
import DocumentCard from "../../components/ui/DocumentCard";
import OrgansationCard from "../../components/ui/OrgansationCard";
import MergeItem from "@/components/ui/MergeItem";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import MergeBar from "@/components/ui/MergeBar";
import { Button } from "@/components/ui/button";
import { Plus,GitPullRequest,FilePlus,ArrowRight } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { Catergory } from "@/shared/types";
import { config } from "@/config";
import useToken from "@/shared/utils/crud/useToken";
import { createQuery } from "@/shared/utils/crud";
import {useLocation} from 'react-router-dom';


const Organsation = () => {
    const location = useLocation()
    console.log(location)
    const token = useToken()
    const [CatergoryName, setCatergoryName] = useState("");
     const AddCategory = (Categorydata:Catergory)=> {
        const payload = {
             __metadata:{
          type: `SP.Data.${config.ListNames.Catergory}ListItem`,
  
      },
        
        ...Categorydata
        }
        createQuery(config.ListNames.Catergory,payload,token.data.FormDigestValue)
        try {
          return true
        } catch (error) {
          console.log(error)
        }
    }
    return ( 
        <>
        
        <NavBar></NavBar>
    <div>
      <div className="flex flex-col mt-10 mx-20 space-y-12">
         <div className="flex flex-col space-y-4">
            <div className="flex flex-row justify-between">
              <p className="font-bold text-xl">Category</p>
                 <Dialog>
      <DialogTrigger asChild>
            <Button className="">
                Add Category 
                <Plus className="ml-2"></Plus>
              </Button>      
        </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>       Add Category </DialogTitle>
          <DialogDescription>
            Type in your new category name and click create .
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category_name" className="text-right">
              Category Name
            </Label>
            <Input id="category_name"  className="col-span-3" onChange={
              (e) => {
                setCatergoryName(e.target.value);
              }
            } />
          </div>
        
        </div>
        <DialogFooter>
          <DialogPrimitive.Close asChild>
          <Button type="submit" onClick={
            () => {
              AddCategory({Cat:CatergoryName,Org:"test",Owner:"test"})
            }
          }>Create</Button>
          </DialogPrimitive.Close>
        </DialogFooter>
      </DialogContent>
    </Dialog>
            </div>
            <div className="flex flex-row space-x-1">
                    <div className="text-slate-400 font-semibold hover:underline hover:text-slate-500 hover:cursor-pointer">
                        <p>Organization name</p>
                    </div>
                    
            </div>
            <div className="border"></div>
            <div className="flex flex-row justify-evenly">
              <OrgansationCard></OrgansationCard>
              <OrgansationCard></OrgansationCard>
              <OrgansationCard></OrgansationCard>

            </div>
        </div>

       
      </div>
    </div>
    <Footer></Footer>
    </>
        
        
        
     );
}
 
export default Organsation;