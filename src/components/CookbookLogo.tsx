function Logo() {

    return (
        <svg
            width="135"
            height="35"
            viewBox="0 0 135 35"
            xmlns="http://www.w3.org/2000/svg"
            >
            <g transform="translate(0,4)">
                <path
                d="M2 2 h14 a4 4 0 0 1 4 4 v18 a4 4 0 0 0 -4 -4 h-14 z"
                fill="#F5F1EA"
                stroke="#6B8E7F"
                stroke-width="1.5"
                />
                <path
                d="M20 2 h14 a4 4 0 0 1 4 4 v18 a4 4 0 0 0 -4 -4 h-14 z"
                fill="#F5F1EA"
                stroke="#6B8E7F"
                stroke-width="1.5"
                />

                <path
                d="M11 10
                    c-1.5 -2 -5 -1 -5 2
                    c0 3 5 5 5 5
                    c0 0 5 -2 5 -5
                    c0 -3 -3.5 -4 -5 -2 z"
                fill="#C97C5D"
                />

                <ellipse cx="26" cy="10" rx="2" ry="3" fill="#C97C5D" />
                <rect x="25" y="13" width="2" height="10" rx="1" fill="#C97C5D" />

                <path
                d="M30 18
                    c3 -2 6 1 3 4
                    c-2 2 -5 0 -3 -4 z"
                fill="#6B8E7F"
                />
            </g>

            <text
                x="44"
                y="23"
                font-size="16"
                font-family="Georgia, serif"
                fill="#262626"
            >
                Digital Cookbook
            </text>
            </svg>

    )
}

export default Logo;