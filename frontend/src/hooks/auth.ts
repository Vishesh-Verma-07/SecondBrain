import { useMutation } from "@tanstack/react-query";
import { SignIn, SignUp } from "../api/auth";


export function useSignIn() {
  return useMutation({
    mutationFn: SignIn,
  });
}

export function useSignUp(){
    return useMutation({
        mutationFn: SignUp
    })
}