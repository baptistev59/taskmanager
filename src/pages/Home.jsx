export default function Home() {
    return (
        <div>
            <img src={`${import.meta.env.BASE_URL}home.png`} alt="Accueil" style={{ margin: "auto", width: "500px", maxWidth: "100%" }} />
        </div>
    )
}
