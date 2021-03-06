import React from 'react';
import { Box, Button, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';

export function ButtonSendSticker(props) {
    const [isOpen, setOpenState] = React.useState('');

    return (
        <Box
            styleSheet={{
                position: 'relative',
            }}
        >
            <Button
                styleSheet={{
                    minWidth: '35px',
                    minHeight: '35px',
                    fontSize: '10px',
                    marginRight: '8px',
                    marginBottom: '8px',
                    lineHeight: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary['500'],
                    filter: isOpen ? 'grayscale(0)' : 'grayscale(1)',
                    hover: {
                        filter: 'grayscale(0)',
                    },
                }}
                buttonColors={{
                    mainColor: appConfig.theme.colors.primary['500'],
                }}
                label="😋"
                onClick={() => setOpenState(!isOpen)}
            />
            {isOpen && (
                <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '5px',
                        position: 'absolute',
                        backgroundColor: appConfig.theme.colors.primary['1000'],
                        width: {
                            xs: '200px',
                            sm: '290px',
                        },
                        height: '300px',
                        right: '30px',
                        bottom: '30px',
                        padding: '16px',
                    }}
                    onClick={() => setOpenState(false)}
                >
                    <Text
                        styleSheet={{
                            color: appConfig.theme.colors.neutrals['000'],
                            fontWeight: 'bold',
                        }}
                    >
                        Stickers
                    </Text>
                    <Box
                        tag="ul"
                        styleSheet={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            flex: 1,
                            paddingTop: '15px',
                            overflow: 'scroll',
                        }}
                    >
                        {appConfig.stickers.map((sticker) => (
                            <Text
                                onClick={() => {
                                    if (Boolean(props.onStickerClick)) {
                                        props.onStickerClick(sticker);
                                    }
                                }}
                                tag="li" key={sticker}
                                styleSheet={{
                                    width: '50%',
                                    borderRadius: '5px',
                                    padding: '10px',
                                    hover: {
                                        backgroundColor: appConfig.theme.colors.primary['600'],
                                    }
                                }}
                            >
                                <Image src={sticker} />
                            </Text>
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    )
}