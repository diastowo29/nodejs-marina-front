const Settings = async ({searchParams} : {
    searchParams: Promise < {
        [key: string]: string
    } >
}) => {
    let urlParams = await searchParams;
    console.log(urlParams);
    return (
        <></>
    );
};

export default Settings;
