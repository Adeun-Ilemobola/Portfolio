"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import z from "zod";
 
export default function page() {
     const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()
    console.log("Current session:", session);
    const [LoginData, setLoginData] = React.useState({
        email: "",
    });
    const [loading, setLoading] = React.useState(false);
    const startLogin = useMutation({
        mutationFn: async (info: typeof LoginData) => {
            try {
                const {  error } = await authClient.signIn.magicLink({
                    email: info.email, // required
                    name: info.email.split("@")[0],
                    callbackURL: "/Auth",
                    
                });
                if (error) {
                    console.log("Login error:", error);
                    throw new Error(error.message);
                }
                setLoading(false);

                toast.success("Login successful", { id: "login-success" });
            } catch (error) {
                toast.error("Login error", { id: "login-error" });
                console.log("Login error:", error);
                setLoading(false);
                return null;
            }
        },
        onMutate() {
            toast.loading("Loading", { id: "login-loading" });
            setLoading(true);
        },
        onSuccess() {
            setLoading(false);
            toast.success("Login successful", { id: "login-loading" });
        },
    });

    return (
        <div className=" backdrop-blur-xs min-h-screen  flex flex-row items-center justify-center">
            <Card className=" w-[25%] h-[300px] flex flex-col  items-center p-6 gap-6 ">
                <h1 className=" text-2xl font-bold mb-6 ">Login Page</h1>

                <InputGroup className=" overflow-hidden">
                    <InputGroupInput
                        className="shadow-sm"
                        value={LoginData.email}
                        onChange={(e) => {
                            setLoginData((pre) => ({
                                ...pre,
                                email: e.target.value,
                            }));
                        }}
                    />
                    <InputGroupAddon align={"inline-start"}>
                        <InputGroupText className="gap-0.5   ">
                            <span className="text-[#e11d48] dark:text-[#fda4af]">
                                *
                            </span>Email
                        </InputGroupText>
                    </InputGroupAddon>
                </InputGroup>

                {
                    /* <InputGroup className=" overflow-hidden">
                    <InputGroupInput className="shadow-sm" value={LoginData.password}  onChange={(e)=>{setLoginData(pre=>({...pre , password:e.target.value}))}}/>
                    <InputGroupAddon align={"inline-start"}>
                        <InputGroupText className="gap-0.5   ">
                            <span className="text-[#e11d48] dark:text-[#fda4af]">
                                *
                            </span>Password
                        </InputGroupText>
                    </InputGroupAddon>
                </InputGroup> */
                }

                <Button
                    onClick={() => {
                        const isValid = z.object({
                            email: z.email(),
                        });
                        const validate = isValid.safeParse(LoginData);
                        if (!validate.success) {
                            validate.error.issues.forEach((error) => {
                                toast.error(error.message, {
                                    id: "login-error",
                                });
                            });

                            return;
                        }
                        startLogin.mutate(LoginData);
                    }}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </Card>
        </div>
    );
}
