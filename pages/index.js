import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json'
import React from 'react';
import { useRouter } from 'next/router'
import Github from '../images/github.png'
import { getURL } from 'next/dist/shared/lib/utils';

function Titulo(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx> {`
                ${Tag}{
                    color: ${appConfig.theme.colors.neutrals['000']};
                    font-size: 26px;
                    font-weight: 600;
                }
            `}</style>
        </>
    );
}

// // Componente React
// function HomePage() {
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h2">Boa vindas de volta!</Titulo>
//             <h2>Discord - Alura Matrix</h2>
//         </div>
//     )
// }
// export default HomePage

export default function PaginaInicial() {

    // const username = 'ErikaDias';
    const [username, setUsername] = React.useState('');
    const [bio, setBio] = React.useState('');
    const roteamento = useRouter();

    // React.useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
        .then((response) => response.json())
        .then(data => { setBio(data.bio) })
    // }, [username])

    return (
        <>

            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary['400'],
                    backgroundImage: 'url(https://cdn.bhdw.net/im/slytherin-house-white-and-green-banner-papel-de-parede-58921_w635.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (infoEvet) {
                            infoEvet.preventDefault();
                            roteamento.push('/chat');
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h2">Boas vindas de volta!</Titulo>
                        <Text variant="body3" styleSheet={{ margin: '20px', color: appConfig.theme.colors.primary['100'] }}>
                            {appConfig.name}
                        </Text>

                        <TextField
                            value={username}
                            onChange={function (event) {
                                const valor = event.target.value;
                                setUsername(valor);
                            }}
                            fullWidth
                            textFieldColors={{
                                colors: {
                                    textColor: appConfig.theme.colors.neutrals['100'],
                                    mainColor: appConfig.theme.colors.primary['500'],
                                    mainColorHighlight: appConfig.theme.colors.primary['500'],
                                    backgroundColor: appConfig.theme.colors.neutrals['800'],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals['200'],
                                mainColor: appConfig.theme.colors.primary['500'],
                                mainColorLight: appConfig.theme.colors.primary['400'],
                                mainColorStrong: appConfig.theme.colors.primary['600'],
                            }}
                        />
                    </Box>
                    {/* Formulário */}

                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '220px',
                            minHeight: '240px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals['600'],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.primary['300'],
                            borderRadius: '10px',
                            flex: 1,
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            // src={`https://github.com/${username}.png`}
                            src={username.length > 2 ? `https://github.com/${username}.png` : `https://github.com/github.png`}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals['200'],
                                backgroundColor: appConfig.theme.colors.neutrals['800'],
                                padding: '3px 10px',
                                borderRadius: '10px',
                                border: '1px solid',
                                borderColor: appConfig.theme.colors.primary['300'],
                            }}
                        >
                            <Box
                                styleSheet={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textAlign: 'center',
                                }}>
                                <Box>
                                    {username.length > 2 ? username : 'Digite o nome do usuário!'}
                                </Box>
                                <Box>
                                    {/* Front end Developer Student | HTML | CSS | JavaScript. */}
                                    {bio}
                                </Box>
                            </Box>
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );



}