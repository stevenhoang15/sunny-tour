import { tableDataType } from "@/interface/QLPages_Content/QLPages_Content";
import { qLPages_Content } from "@/services/QLPages_Content/QLPages_Content.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const HomeComponent = () => {
    const [pageHome, setPageHome] = useState<tableDataType[]>();

    const handleGetContentPage = async () => {
        try {
            const response = await qLPages_Content.GetPageHome();
            const data = response.data.data;

            setPageHome(data);

            // 🟢 Inject CSS vào <head>
            if (data.length > 0 && data[0].style) {
                const styleTag = document.createElement("style");
                styleTag.innerHTML = JSON.parse(data[0].style);

                document.head.appendChild(styleTag);
            }
        } catch (err) {
            toast.error("Không tìm kiếm thành công");
        }
    };

    useEffect(() => {
        handleGetContentPage();
    }, []);

    return (
        <>
            {pageHome?.map((page) => (
                <div
                    key={page.id}
                    dangerouslySetInnerHTML={{
                        __html: JSON.parse(page.html),
                    }}
                />
            ))}
        </>
    );
};

export default HomeComponent;
