


function Home() {

    return (
        <div className="flex h-screen">
            <div className="flex-1 flex flex-col">
                <main className="page-content" style={{ paddingTop: '20px', padding: '1rem' }}>
                <h2 className="text-3xl font-semibold mb-5">
                        Ласкаво просимо на головну сторінку!
                    </h2>
                    <p>Натисніть «Меню» у бічному меню, щоб побачити список категорій.</p>
                </main>
            </div>
        </div>
    );
}

export default Home;