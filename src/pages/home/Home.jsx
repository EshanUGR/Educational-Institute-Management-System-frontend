/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom"
import "./Home.css"
import { Button } from "@mui/material"
import { useSelector } from "react-redux"
import { useEffect } from "react"

const Item = ({ color, service }) => {
    return (
        <div className="service" style={{ backgroundColor: color }}>
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>{service}</Link>
        </div>
    )
}

const ourServices = [
    { title: "Exam Management Service", color: "#563D67" },
    { title: "Student Suport Survice", color: "#4F1B1D" },
    { title: "Inventory Management Service", color: "green" }
]

const Home = () => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user)

    useEffect(() => {
        if (user) {
            navigate("/login")
        }
    }, [user, navigate]);

    return (
        <div className="home-container">
            <div className="loginRegisterButton">
                <Button variant="contained" sx={{ margin: "20px" }}>
                    <Link to="/login" className="loginAndRegisterLinks">Login</Link>
                </Button>
                <Button variant="contained" sx={{ margin: "20px 20px 20px 0px" }}>
                    <Link to="/register" className="loginAndRegisterLinks">Register</Link>
                </Button>
            </div>
            <div className="services">
                {
                    ourServices.map(service => (
                        <div key={service.color}>
                            <Item color={service.color} service={service.title} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home