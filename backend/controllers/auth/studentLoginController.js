import supabase from '../../supabase-client.js';
import { INVALID_CREDENTIALS } from '../../errorMessages.js';

export const studentLoginController = async (request, response) => {
  try {
    // Variables
    let rollNo = request.body.rollNo;
    let password = request.body.password;

    // Check for user by rollNo
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('email, role')
      .eq('roll_no', rollNo)
      .single();

    if (userError || !user) {
      return response.status(400).json({
        success: false,
        message: INVALID_CREDENTIALS
      });
    }

    // Login using the linked email logic
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password
    });

    // Supabase API error 
    if (error) {
        return response.status(400).json({ 
            success: false,
            message: INVALID_CREDENTIALS
        });
    }

    // Successful login response
    return response.status(200).json({
      success: true,
      role: user.role,
      token: authData.session.access_token
    });

 } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message
    });
  }
};
