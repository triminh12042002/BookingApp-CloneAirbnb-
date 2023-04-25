import axios from 'axios'
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom"


export default function PlacePage() {

    return (
        <div>
            <div className="text-center my-2 ">
                <Link className='inline-flex bg-primary text-white py-2 px-4 rounded-full' to={'/account/places/new'} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place
                </Link>
            </div>
        </div>
    )
}