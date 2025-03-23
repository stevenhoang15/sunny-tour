import HomeSlider from "@/components/Main/HomeSectionBanner";
import PackageWrap from "@/components/Package/packagewrap";
import { Row } from "antd";
const tour = () => {
    return <>
    <HomeSlider />
    <div className="container">
        <Row gutter={[25, 25]}>
            <PackageWrap />
            <PackageWrap />
            <PackageWrap />
        </Row>
        <Row gutter={[25, 25]}>
            <PackageWrap />
            <PackageWrap />
            <PackageWrap />
        </Row>
        <Row gutter={[25, 25]}>
            <PackageWrap />
            <PackageWrap />
            <PackageWrap />
        </Row>
    </div>
    
    </>
}


export default tour; 

 