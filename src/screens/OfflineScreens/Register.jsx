import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CustomInput from '../../components/Ui/CustomInput';
import ErrorMessage from '../../components/Ui/ErrorMessage';
import ButtonLoader from '../../components/Loader/ButtonLoader';
import { useAuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { API_ROOT } from '../../constants/apiConstant';

const Register = () => {

    //on délcare nos state pour les valeurs du formulaire
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState('');

    //on récupère le hook de navigation
    const navigate = useNavigate();
    //on récupère la méthode signIn du context
    const { signIn } = useAuthContext();

    useEffect(() => {
        //si j'ai un utilisateur en session, on le redirige sur '/' du OnlineRouter
        if (user) {
            navigate("/");
        }
    }, [user, navigate])

    //Méthode qui receptionne les datas du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault(); //on empeche le comportement naturel du formulaire
        setIsLoading(true);
        setErrorMessage('');
        try {
            //verifs
            if (email === '' || nickname === '' || password === '' || confirmPassword === '') {
                setErrorMessage("Tout les champs sont obligatoires");
                return;
            } else if (password !== confirmPassword) {
                setErrorMessage("Les mots de passe doivent être identiques");
                return;
            } else if (password.length < 4) {
                setErrorMessage("Le mot de passe doit contenir au moins 4 caractères");
                return;
            } else {
                const response = await axios.post(`${API_ROOT}/register`, {
                    email,
                    password,
                    nickname
                });

                if (response.data?.success === false) {
                    setErrorMessage(response.data.message);
                } else {
                    const loggedInUser = {
                        userId: response.data.user.id,
                        email: response.data.user.email,
                        nickname: response.data.user.nickname
                    }

                    //on appelle la méthode signIN de authcontext pour enregistrer l'utilisateur
                    await signIn(loggedInUser);
                    setUser(loggedInUser);

                    //on force la redirection vers la plateforme
                    navigate("/");
                }
            }

        } catch (error) {
            console.log(`Erreur de requete lors de la création du compte: ${error}`);
            setErrorMessage(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='col w-full min-h-[70vh] px-4 sm:px-6 py-8'>
            <div className="w-full max-w-md animate-slideup2">
                <div className="text-center mb-8">
                    <h1 className="title-h1">Inscrivez-vous</h1>
                    <p className="text-gray-300 mt-2 text-sm">Rejoignez la platforme en quelques secondes</p>
                </div>

                {/* formulaire */}
                <form
                    onSubmit={handleSubmit}
                    className='w-full rounded-2xl bg-black/60 backdrop-blur-xl border border-white_01 p-8 sm:p-10 shadow-2xl shadow-black_05'>

                    <div className="space-y-1">
                        <CustomInput
                            label={'Pseudo'}
                            type={'text'}
                            placeholder='votre pseudo'
                            state={nickname}
                            callable={(event) => setNickname(event.target.value)} />
                        <CustomInput
                            label={'Email'}
                            type={'email'}
                            placeholder='votre@email'
                            state={email}
                            callable={(event) => setEmail(event.target.value)} />

                        <CustomInput
                            label={'Mot de passe'}
                            type={'password'}
                            placeholder='•••••••'
                            state={password}
                            callable={(event) => setPassword(event.target.value)} />
                        <CustomInput
                            label={'Confirmer votre mot de passe'}
                            type={'password'}
                            placeholder='•••••••'
                            state={confirmPassword}
                            callable={(event) => setConfirmPassword(event.target.value)} />
                    </div>

                    {errorMessage && <ErrorMessage message={errorMessage} />}

                    <div className="mt-8">
                        {isLoading ? (
                            <div className="flex justify-center py-2">
                                <ButtonLoader />
                            </div>
                        ) : (
                            <button className='main-button' type="submit">
                                S'inscrire
                            </button>
                        )}
                    </div>

                    <p className="mt-6 text-center text-gray-300 text-sm">
                        Déja un compte ?{' '}
                        <Link to={'/'} className='text-green font-semibold hover:text-green_top underline underline-offset-2 transition-colors'>
                            Se connecter
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register