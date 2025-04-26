import SubmissionForm from '@/components/frontend/home/SubmissionForm'
import { auth } from '@/utils/auth'


const SubmissionPage = async () => {
    const session = await auth();
    

    const user = {
        firstName: "",
        lastName: "",
        email: ""
    }

    const names = session?.user?.name?.split(" ");
    if(names && names.length > 2) {
        user.firstName = `${names[0]} ${names[1]}`;
        user.lastName = `${names[2]}`;
    } else if (names && names.length === 2) {
        user.firstName = names[0];
        user.lastName = names[1];
    }
    user.email = session?.user?.email || "";
  return (
    <SubmissionForm user={user}  />
  )
}

export default SubmissionPage