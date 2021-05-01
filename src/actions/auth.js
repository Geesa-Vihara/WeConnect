import Firebase, {db, provider} from '../firebase';

export const login = async function login(credentials) {
    try {
        const response = await Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);      
        return true;  

    } catch (error) {
        console.log('error', error);
        // alert(error)
        return error;
    }
}

export const logout = async function logout() {
    try {
        const response = await Firebase.auth().signOut()
        return response

    } catch (error) {
        console.log('error',error);
        return false
    }
}

export const signUp = async function signUp(data) {
    try {
        const response = await Firebase.auth().createUserWithEmailAndPassword(data.email,data.password);
        console.log('user', response.user.uid)
        if(response.user.uid) {
            console.log('if user')
            const user = {
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
                contactno: data.contactno
            }
            await db.collection('users').doc(response.user.uid).set(user);
            // await db.collection('crowdcount').doc(response.user.uid).set(crowdcount);
        }
        return true
    } catch (error) {
        console.log('error', error);
        // alert(error)
        return error
    }
}

export const getAuthStatus = async function getAuthStatus() {
    Firebase.auth().onAuthStateChanged(user => {
        if (user) { 
            return user
        } 
        else { 
            return false
        }
      })
}

export const getUserType = async function getUserType(uid) {
    const ref = db.collection('admins').doc(uid);
    const doc = await ref.get();
    if (doc.exists) {
        console.log('admin');
        return 'admin'
    } else {
        console.log('user');
        return 'user'
    }
}