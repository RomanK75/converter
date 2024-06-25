import { useState } from "react"

type Props = {}

export default function Converter({}: Props) {
    const [color, setColor] = useState({
        hexColor: '#',
        rgbColor: '',
    })

    const errorScreen = (hex:string) => {
        setColor({
            hexColor: hex,
            rgbColor: 'Ошибка!',
        })
        document.body.style.backgroundColor = '#FF0000';
    }

    const hexToRGB = (hex: string): { r: number, g: number, b: number } => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) {
            throw Error('Invalid hex color');
        }

        const r = parseInt(result[1], 16);
        const g = parseInt(result[2], 16);
        const b = parseInt(result[3], 16);
        return { r, g, b };
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newHex = e.target.value;
        if (newHex.length >= 7){
            try {
                const rgb = hexToRGB(newHex);
                setColor({
                    hexColor: newHex,
                    rgbColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
                })
                document.body.style.backgroundColor = newHex
            }
            catch (error) {
                errorScreen(newHex);
            }
        }
        else {
            setColor({
                hexColor: newHex,
                rgbColor: ''
            })
        }
    }

    return (
        <form>
            <label htmlFor="hex-input">HEX</label>
            <input type="text" id="hex-input" value={color.hexColor} onChange={handleChange} />
            <label htmlFor="rgb-output">RGB</label>
            <input type="text" id="rgb-output" value={color.rgbColor} readOnly />
        </form>
    )
}
