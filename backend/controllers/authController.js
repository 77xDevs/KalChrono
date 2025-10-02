import supabase from "../supabase-client.js";

const handleStudentLogin = async (req, res) => {
    const { rollNo, password, role } = req.body;

    if(role !== 'student'){
        return res.status(403).json({ error: "Only students should login"});
    }

    const email = `${rollNo}@pujyank.com`;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password  });
    if(error){
        return res.status(400).json({ error: "Error signing in, check credentials" });
    } else {
        return res.status(200).json({ statusCode: 200, message: "Login Successfull" });
    }
};

export default {
    handleStudentLogin,
};