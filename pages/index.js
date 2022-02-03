//Usando os componentes da lib @skynexui
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
// Importanto arquivo de configuração de cores e stickers 
import appConfig from '../config.json'
// Importação do React
import React from 'react';
// Importanto roteamento do next
import { useRouter } from 'next/router'

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

export default function PaginaInicial() {

    const [username, setUsername] = React.useState('');
    const [bio, setBio] = React.useState();
    const roteamento = useRouter();

    fetch(`https://api.github.com/users/${username}`)
        .then((response) => {
            if (response.status === 200) {
                response.json()
                    .then(data => { setBio(data.bio) })
            }
        });

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary['200'],
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
                        backgroundColor: appConfig.theme.colors.primary['1000'],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        //O onSubmit faz o roteamento usando hooks do next informando o usuario pela url
                        as="form"
                        onSubmit={function (infoEvet) {
                            infoEvet.preventDefault();
                            roteamento.push(`/chat?username=${username}`);
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
                                // Onde está o valor
                                const valor = event.target.value;
                                // Set um novo valor para o campo
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
                            backgroundColor: appConfig.theme.colors.primary['1000'],
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
                            //Operador ternario para mostrar imagem do git antes da pesquisar por algun usuário.
                            src={username.length > 2 ? `https://github.com/${username}.png` : `https://github.com/github.png`}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals['200'],
                                backgroundColor: appConfig.theme.colors.primary['1000'],
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
                                {/* Mostrar a bio do usuário no github */}
                                <Box>
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