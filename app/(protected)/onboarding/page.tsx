import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import OnBoardingForm from "@/components/onboarding/OnBoardingForm";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }


  const { data: profile, error } = await supabase.from("user_profile").select("*").eq("user_id", user.id).single();
  if(profile) {
    return redirect("/home");
  
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      {JSON.stringify(profile, null, 2)}
      <OnBoardingForm />
    </div>
  );
}
