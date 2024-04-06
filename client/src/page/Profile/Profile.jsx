import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AiOutlineArrowLeft } from "react-icons/ai";




function Profile() {
   

    const userData=useSelector(state=>state?.auth?.user)

   

    return (
       
            <div className="min-h-[90vh] flex items-center justify-center">
                <div className="my-10 flex flex-col items-center rounded-lg gap-4">
                  
                   <CgProfile size={300}  className="w-42 m-auto rounded-full border border-black"/>
                   <div >
                   <h3 className="text-xl font-semibold text-center capitalize">
                     {userData?.fullName}
                   </h3>
                  
                    <p className="text-center"> {userData?.email}</p>
                   
                   </div>
         
                   <Link
            to={"/"}
            className=" text-2xl  text-center btn btn-primary cursor-pointer"
          >
             Back
          </Link>

                   
                </div>

            </div>
       
    );
}

export default Profile;