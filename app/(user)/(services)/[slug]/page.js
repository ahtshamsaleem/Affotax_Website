import Service from "@/components/Services/Service/Service"
import ContractorAccountants from "@/components/WhoWeHelp/ContractorAccountants/index.jsx";
import LimitedCompanies from "@/components/WhoWeHelp/LimitedCompanies/index.jsx";
import LimitedLiabilityPartnership from "@/components/WhoWeHelp/LimitedLiabilityPartnership/index.jsx";
import Partnerships from "@/components/WhoWeHelp/Partnerships/index.jsx";
import SmallBusinessAccountants from "@/components/WhoWeHelp/SmallBusinessAccountants/index.jsx";
import SoleTraders from "@/components/WhoWeHelp/SoleTraders/index.jsx";
import XeroAccountants from "@/components/WhoWeHelp/XeroAccountants/index.jsx";
import EcommerceAccountants from "@/components/WhoWeHelp/EcommerceAccountants/index.jsx"
import PropertyAccountants from "@/components/WhoWeHelp/PropertyAccountants/index.jsx"
import FreelanceAccountants from "@/components/WhoWeHelp/FreelanceAccountants/index.jsx"
import AccountantsNearMe from "@/components/WhoWeHelp/AccountantsNearMe/index.jsx"
import CheapAccountants from "@/components/WhoWeHelp/CheapAccountants/index.jsx"
import { dataArr } from "@/data/serviceData"
import { metaDataObject } from "@/data/metadataWhowehelp";
import { notFound, redirect } from "next/navigation";
import P45Form from "@/components/Services/Service/CustomServicePages/P45Form";
import { getPageData } from "@/lib/getPage";
import Template from "@/components/WhoWeHelp/Template";
import Page from "@/lib/Model/Page/Page";
import { connectDB } from "@/lib/connectDB";



// GENERATING THE DYNAMIC META DATA


export async function generateMetadata({ params}) {
  // read route params
  //const id = params.id
 
  // fetch data
  //const product = await fetch(`https://.../${id}`).then((res) => res.json())
 
  // optionally access and extend (rather than replace) parent metadata
  //const previousImages = (await parent).openGraph?.images || []
 

  let serviceData = dataArr.filter((el) => el.link === params.slug);
  if (serviceData.length === 0) {
    return {
      title: metaDataObject[params.slug]?.title,
      description: metaDataObject[params.slug]?.description,
    
      
    }
  }


  return {
    title: serviceData[0].metaTitle,
    description: serviceData[0].metaDescription,
    keywords: serviceData[0].keywords ,
    authors: [{ name: 'Affotax', url: 'https://affotax.com' }],
    creator: 'Ihtisham Ul Haq -- +92-301-6667656',
  
    
  }
}






// SERVICES PAGE AND WHO WE HELP PAGES HERE




export default async function ServicesPage({params}) {
    console.log( 'the result is',params.slug)


    let render;
    const location = params.slug;

    switch(location) {
        case 'sole-traders': return render = <SoleTraders />
        case 'limited-companies': return render = <LimitedCompanies />
        case 'partnerships': return render = <Partnerships />
        case 'limited-liability-partnerships': return render = <LimitedLiabilityPartnership />
        case 'contractor-accountants': return render = <ContractorAccountants />
        case 'small-business-accountants': return render = <SmallBusinessAccountants />
        case 'xero-accountants': return render = <XeroAccountants />
        case 'ecommerce-accountants': return render = <EcommerceAccountants />
        case 'property-accountants': return render = <PropertyAccountants />
        case 'freelance-accountants': return render = <FreelanceAccountants />
        case 'accountants-near-me': return render = <AccountantsNearMe />
        case 'cheap-accountants': return render = <CheapAccountants />

        case 'p60-form': return render = <P45Form />


    }



    




      // SERVICES PAGES
    if (!render) {
      let serviceData = dataArr.filter((el) => el.link === params.slug);
      console.log(serviceData)

      if (serviceData.length === 0) {




        const db = await connectDB()
        const page = await Page.findOne({slug: params.slug});

        if (!page) {
          redirect('/')
        }

        

        const jsonPage = JSON.stringify(page)

        render = <Template jsonPage={jsonPage}/>

       
        // notFound();
        // return <h3>THIS PAGE DOES NOT EXIST | WE'RE WORKING ON IT | THANK YOU FOR YOUR COOPERATION</h3>
      } else {

        render = <Service data={serviceData[0]}/>
      }
       
    }




    return <> {render} </>








    
    

    //console.log(serviceData)

    










    
}

