"use client";

import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const VanBanPhapLuatChart = () => {
    useEffect(() => {
        const root = am5.Root.new("chartvbpl");

        root.setThemes([am5themes_Animated.new(root)]);

        const chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                layout: root.verticalLayout,
            }),
        );

        const series = chart.series.push(
            am5percent.PieSeries.new(root, {
                name: "Series",
                categoryField: "category",
                valueField: "value",
            }),
        );

        const customColors = [
            am5.color(0x347928),
            am5.color(0xC0EBA6),
            am5.color(0xFFFBE6),
            am5.color(0xFCCD2A),
            am5.color(0x6A9AB0),
            am5.color(0xEE66A6),
        ];

        // Gán màu từ mảng customColors
        series.get("colors")?.set("colors", customColors);

        series.data.setAll([
            { category: "Đã duyệt", value: 40 },
            { category: "Chờ duyệt", value: 35 },
            { category: "Từ chối", value: 25 },
        ]);

        series.labels.template.set("text", "{category}: {value}%");

        root._logo?.dispose();

        return () => {
            root.dispose();
        };
    }, []);

    return (
        <div id="chartvbpl" style={{ width: "100%", height: "400px" }}></div>
    );
};

export default VanBanPhapLuatChart;
