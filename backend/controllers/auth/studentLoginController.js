import supabase from "../../supabase-client.js";
import { WRONG_CREDENTIALS, WRONG_ROLE } from "../../errorMessages.js";

export const studentLoginController = {
    studentLogin: async (request, response) => {
        try {
            //Variables
            let rollNo = request.body.rollNo;
            let password = request.body.password;
            let role = request.body.role;

            // Checking the role of user
            if (role !== 'student') {
                return response.status(403).json({ 
                    "success": "false",
                    "message": WRONG_ROLE 
                });
            };
            
            // Login logic
            const email = `${rollNo}@pujyank.com`;

            const { data, error } = await supabase.auth.signInWithPassword({ 
                email, 
                password 
            });

            // Supabase API error
            if (error) {
                return response.status(400).json({ 
                    "success": "false",
                    "message": WRONG_CREDENTIALS
                });
            };

            // Successful login
            return response.status(200).json({
                "statusCode": 200,
                "message": "Login successfully"
            });

        } catch (error) {

            // Internal Server Error
            return response.status(500).json({
                "success": "false",
                "message": error.message
            });
        }
    }
};
