import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";

export const metadata = {
  title: "আমার প্রোফাইল — বাজার দর",
};

const ProfilePage = async () => {
  // server-side guard: signed-out visitors go to the sign-in page
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin");

  const { name, email, image } = session.user;

  return (
    <main className="container mx-auto px-4 my-7.5 space-y-4 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-heading">আমার প্রোফাইল</h1>
        <p className="text-[12px] sm:text-sm text-pera mt-1">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <ProfileHeader name={name} email={email} image={image} />
      <ProfileForm name={name} />
    </main>
  );
};

export default ProfilePage;
