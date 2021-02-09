import { Button } from 'antd';
import { SearchBar } from 'antd-mobile';

function App(): JSX.Element {
    return (
        <>
            <div>I am here</div>
            <Button>Yo</Button>
            <SearchBar placeholder="Search" maxLength={8} />
            <OtherApp />
        </>
    );
}

export const OtherApp: React.FC = () => {
    return <div>i am other APP</div>;
};

export default App;
