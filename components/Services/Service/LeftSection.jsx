'use client'

import React from "react";

const LeftSection = ({ title, content }) => {

    //let html = content.html || null;

    
    


    return (
        <section className="w-full ">
            <div className="container mx-auto flex flex-col justify-center items-start  ">
                {/* <h1 className="text-3xl font-semibold ">{title}</h1> */}

                {
                    <div dangerouslySetInnerHTML={{__html: content}}  ></div>
                }
            </div>
        </section>
    );
};

export default LeftSection;
