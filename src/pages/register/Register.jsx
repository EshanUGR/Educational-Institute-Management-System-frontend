/* eslint-disable react/prop-types */
import {
    Avatar,
    Button,
    TextField,
    Grid,
    Box,
    Typography,
    Container,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from "@mui/material"
import { ArrowForward, LockOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { simpleNotification, userRoles } from '../../utiles';
import { register } from '../../app/features/user/userApis';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrorMessage } from '../../app/features/user/userSlice';

const SelectOption = ({ setUserDetails, userDetails, name, label, value, items }) => {
    const handleChange = (e) => {
        if (name === "role") {
            setUserDetails({ ...userDetails, role: e.target.value });
        } else if (name === "gender") {
            setUserDetails({ ...userDetails, gender: e.target.value });
        }

    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={label}
                    name={name}
                    onChange={handleChange}
                >
                    {items?.map((item, i) => (
                        <MenuItem key={i} value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
        gender: "",
        nic: ""
    });
    const { user, error } = useSelector(state => state.user)

    useEffect(() => {
        if (!user && error !== "") {
            dispatch(clearErrorMessage())
        }
    }, [user, error, dispatch]);

    // show error message if exist
    if (error !== "") {
        simpleNotification("error", error)
    }

    const canRegister = [userDetails.firstName, userDetails.lastName, userDetails.email, userDetails.password, userDetails.role, userDetails.gender, userDetails.nic].every(Boolean)

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setUserDetails({ ...userDetails, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (canRegister) {
            dispatch(register({ ...userDetails, navigate }))
            setUserDetails({ ...userDetails, firstName: "", lastName: "", email: "", password: "", role: "", nic: "", gender: "" })
        } else {
            simpleNotification("error", "All input fields required!")
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "end",
                    gap: "10px",
                    padding: "10px 10px 0px 0px",
                    position: "fixed",
                    top: 0,
                    right: 0,
                }}
            >
                <Link to="/">Return to home</Link><ArrowForward />
            </Box>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={userDetails.firstName}
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                value={userDetails.lastName}
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={userDetails.email}
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="nic"
                                label="NIC"
                                name="nic"
                                value={userDetails.nic}
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={userDetails.password}
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SelectOption
                                setUserDetails={setUserDetails} userDetails={userDetails}
                                name="role"
                                label="Role"
                                value={userDetails?.role}
                                items={userRoles}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SelectOption
                                setUserDetails={setUserDetails} userDetails={userDetails}
                                name="gender"
                                label="Gender"
                                value={userDetails?.gender}
                                items={["Male", "Female"]}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default Register