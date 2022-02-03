//Usando os componentes da lib @skynexui
import { Box, Text, TextField, Image, Button } from '@skynexui/components';
// Importanto arquivo de configuração de cores e stickers 
import appConfig from '../config.json';
// Importação do React
import React from 'react';
// Importanto roteamento do next
import { useRouter } from 'next/router';
// Importando o supabase
import { createClient } from '@supabase/supabase-js';
// Importanto os stickers
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

// Declaramos em variaveis URL e chave de acesso.
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMxMzYzNywiZXhwIjoxOTU4ODg5NjM3fQ.uYCkPkHrOVdkKdr-BD81N1qS8OVTWi76Sn4Xa2Xm5qs';
const SUPABASE_URL = 'https://oecoomsreminzhrnquoy.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);


export default function ChatPage() {

    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('');
    const [listaMensagens, setlistaMensagens] = React.useState([]);
    const [deletar, setDeletar] = React.useState([])

    // Função que realiza o Realtime
    function escutaMensagens(adicionaMensagem) {
        return supabaseClient
            .from('mensagens')
            .on('INSERT', (respostaLive) => {
                adicionaMensagem(respostaLive.new);
            })
            .subscribe();
    }


    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                setlistaMensagens(data);
            });

        // Chamando a função que escuta para ver as mensagens em tempo real
        escutaMensagens((novaMensagem) => {
            setlistaMensagens((valorAtualDaLista) => {
                return [
                    novaMensagem,
                    ...valorAtualDaLista,
                ]
            });
        });
    }, []);

    // Função que adiciona as mensagem a lista
    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            de: usuarioLogado,
            texto: novaMensagem
        };

        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(({ data }) => {
                console.log('Mansagem: ' + data);
            });
        setMensagem('');
    }

    // Pega a mensagem usando filter e realizar a exclusão
    function handleDelete(id) {
        setDeletar((valorAtual) => {
            return [...valorAtual, id];
        })
        supabaseClient
            .from('mensagens')
            .delete()
            .match({ id })
            .then(() => {
                setDeletar((valorAtual) => {
                    return valorAtual.filter((novo) => {
                        return novo !== id;
                    })
                })
                setlistaMensagens(listaMensagens.filter((element) => {
                    return element.id !== id;
                }))
            })

    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: 'url(https://cdn.bhdw.net/im/slytherin-house-white-and-green-banner-papel-de-parede-58921_w635.jpg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000'],
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.primary['1000'],
                    height: '100%',
                    maxWidth: '90%',
                    maxHeight: '90vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.primary['1000'],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList
                        mensagens={listaMensagens}
                        onDelete={handleDelete}
                    />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'flex-start',

                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            // Enviar a mensagem com Enter
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault();
                                    console.log(event);
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.primary['600'],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals['000'],
                            }}

                        />
                        <ButtonSendSticker
                            // Chama a função que renderiza os sticker
                            onStickerClick={(sticker) => {
                                handleNovaMensagem(':sticker: ' + sticker)
                            }}
                        />
                        <Button
                            // Botão de enviar 
                            onClick={(event) => {
                                event.preventDefault();
                                handleNovaMensagem(mensagem);
                            }}
                            type='submit'
                            label='Enviar'
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals['200'],
                                mainColor: appConfig.theme.colors.primary['500'],
                                mainColorLight: appConfig.theme.colors.primary['400'],
                                mainColorStrong: appConfig.theme.colors.primary['600'],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box
                styleSheet={{
                    width: '100%',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    label='Logout'
                    href="/"
                    buttonColors={{
                        contrastColor: appConfig.theme.colors.neutrals['000'],
                        mainColor: appConfig.theme.colors.primary['100'],
                        mainColorLight: appConfig.theme.colors.primary['600'],
                    }}
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.primary['600'],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals['000'],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                            <Button
                                label='x'
                                title="Deletar"
                                styleSheet={{
                                    marginLeft: '0',
                                    fontSize: '8px',
                                    marginLeft: '8px',
                                    padding: '4px'
                                }}
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.neutrals['000'],
                                    mainColor: appConfig.theme.colors.primary['100'],
                                    mainColorLight: appConfig.theme.colors.primary['600'],
                                }}
                                onClick={() => {
                                    props.onDelete(mensagem.id)
                                }}
                            />
                        </Box>
                        {mensagem.texto.startsWith(':sticker:')
                            ? (
                                <Image src={mensagem.texto.replace(':sticker:', '')}
                                    styleSheet={{
                                        maxWidth: '25%',
                                        padding: '2px',
                                    }}
                                />
                            )
                            : (
                                mensagem.texto
                            )}
                    </Text>
                );
            })}
        </Box>
    )
}