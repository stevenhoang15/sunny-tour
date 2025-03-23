"use client";

import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5geodataVietnam from "@amcharts/amcharts5-geodata/vietnamLow"; // Bản đồ Việt Nam
import { useEffect, useState } from "react";
import {
  DiaPhuongDashboardDto,
  SearchDiaPhuongDashboard,
} from "@/interface/thuongHieu/thuongHieu";
import { thuongHieuService } from "@/services/thuongHieu/thuongHieu.service";

const DiaPhuongPhanAnh: React.FC = () => {
  const [dataX, setDataX] = useState<DiaPhuongDashboardDto[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return; // Đảm bảo chỉ chạy trên client

    // Kiểm tra và hủy Root cũ trước khi tạo mới
    // Kiểm tra nếu root đã tồn tại thì hủy trước khi tạo mới
    const existingRoot = am5.registry.rootElements.find(
      (r) => r.dom.id === "chartdivTinh"
    );
    if (existingRoot) {
      existingRoot.dispose();
    }
    const root = am5.Root.new("chartdivTinh");

    // Áp dụng theme
    root.setThemes([am5themes_Animated.new(root)]);

    // Tạo biểu đồ
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        projection: am5map.geoMercator(),
      })
    );

    // Tạo series bản đồ
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        calculateAggregates: true,
        valueField: "value",
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name} {value}",
      interactive: true,
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x677935),
    });

    polygonSeries.set("heatRules", [
      {
        target: polygonSeries.mapPolygons.template,
        dataField: "value",
        min: am5.color(0x8ab7ff),
        max: am5.color(0x25529a),
        key: "fill",
      },
    ]);

    const heatLegend = chart.children.push(
      am5.HeatLegend.new(root, {
        orientation: "vertical",
        startColor: am5.color(0x8ab7ff),
        endColor: am5.color(0x25529a),
        startText: "Lowest",
        endText: "Highest",
        stepCount: 5,
      })
    );

    heatLegend.startLabel.setAll({
      fontSize: 12,
      fill: heatLegend.get("startColor"),
    });

    heatLegend.endLabel.setAll({
      fontSize: 12,
      fill: heatLegend.get("endColor"),
    });

    polygonSeries.events.on("datavalidated", function () {
      heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
      heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
    });
    const dataxx = [
      { id: "VN-01", value: 150, tenTinh: "Hà Nội" },
      { id: "VN-02", value: 180, tenTinh: "TP Hồ Chí Minh" },
      { id: "VN-03", value: 90, tenTinh: "Hải Phòng" },
      { id: "VN-04", value: 60, tenTinh: "Đà Nẵng" },
      { id: "VN-05", value: 120, tenTinh: "Cần Thơ" },
      { id: "VN-06", value: 110, tenTinh: "An Giang" },
      { id: "VN-07", value: 75, tenTinh: "Bà Rịa - Vũng Tàu" },
      { id: "VN-09", value: 85, tenTinh: "Bắc Giang" },
      { id: "VN-13", value: 95, tenTinh: "Bắc Kạn" },
      { id: "VN-14", value: 100, tenTinh: "Bạc Liêu" },
      { id: "VN-15", value: 125, tenTinh: "Bắc Ninh" },
      { id: "VN-20", value: 130, tenTinh: "Bến Tre" },
      { id: "VN-21", value: 110, tenTinh: "Bình Định" },
      { id: "VN-23", value: 150, tenTinh: "Bình Dương" },
      { id: "VN-24", value: 140, tenTinh: "Bình Phước" },
      { id: "VN-25", value: 135, tenTinh: "Bình Thuận" },
      { id: "VN-26", value: 100, tenTinh: "Cà Mau" },
      { id: "VN-27", value: 115, tenTinh: "Cao Bằng" },
      { id: "VN-30", value: 160, tenTinh: "Đắk Lắk" },
      { id: "VN-31", value: 145, tenTinh: "Đắk Nông" },
      { id: "VN-32", value: 85, tenTinh: "Điện Biên" },
      { id: "VN-33", value: 90, tenTinh: "Đồng Nai" },
      { id: "VN-34", value: 170, tenTinh: "Đồng Tháp" },
      { id: "VN-35", value: 95, tenTinh: "Gia Lai" },
      { id: "VN-36", value: 140, tenTinh: "Hà Giang" },
      { id: "VN-37", value: 110, tenTinh: "Hà Nam" },
      { id: "VN-39", value: 105, tenTinh: "Hà Tĩnh" },
      { id: "VN-40", value: 100, tenTinh: "Hậu Giang" },
      { id: "VN-41", value: 95, tenTinh: "Hòa Bình" },
      { id: "VN-42", value: 110, tenTinh: "Hưng Yên" },
      { id: "VN-43", value: 150, tenTinh: "Khánh Hòa" },
      { id: "VN-44", value: 130, tenTinh: "Kiên Giang" },
      { id: "VN-45", value: 80, tenTinh: "Kon Tum" },
      { id: "VN-46", value: 100, tenTinh: "Lai Châu" },
      { id: "VN-47", value: 115, tenTinh: "Lâm Đồng" },
      { id: "VN-48", value: 105, tenTinh: "Lạng Sơn" },
      { id: "VN-49", value: 90, tenTinh: "Lào Cai" },
      { id: "VN-50", value: 100, tenTinh: "Long An" },
      { id: "VN-51", value: 95, tenTinh: "Nam Định" },
      { id: "VN-52", value: 130, tenTinh: "Nghệ An" },
      { id: "VN-53", value: 110, tenTinh: "Ninh Bình" },
      { id: "VN-54", value: 120, tenTinh: "Ninh Thuận" },
      { id: "VN-55", value: 140, tenTinh: "Phú Thọ" },
      { id: "VN-56", value: 125, tenTinh: "Phú Yên" },
      { id: "VN-57", value: 100, tenTinh: "Quảng Bình" },
      { id: "VN-58", value: 130, tenTinh: "Quảng Nam" },
      { id: "VN-59", value: 140, tenTinh: "Quảng Ngãi" },
      { id: "VN-60", value: 135, tenTinh: "Quảng Ninh" },
      { id: "VN-61", value: 120, tenTinh: "Quảng Trị" },
      { id: "VN-62", value: 90, tenTinh: "Sóc Trăng" },
      { id: "VN-63", value: 100, tenTinh: "Sơn La" },
      { id: "VN-64", value: 140, tenTinh: "Tây Ninh" },
      { id: "VN-65", value: 150, tenTinh: "Thái Bình" },
      { id: "VN-66", value: 135, tenTinh: "Thái Nguyên" },
      { id: "VN-67", value: 160, tenTinh: "Thanh Hóa" },
      { id: "VN-68", value: 170, tenTinh: "Thừa Thiên Huế" },
      { id: "VN-69", value: 100, tenTinh: "Tiền Giang" },
      { id: "VN-70", value: 140, tenTinh: "Trà Vinh" },
      { id: "VN-71", value: 90, tenTinh: "Tuyên Quang" },
      { id: "VN-72", value: 120, tenTinh: "Vĩnh Long" },
      { id: "VN-73", value: 130, tenTinh: "Vĩnh Phúc" },
      { id: "VN-74", value: 125, tenTinh: "Yên Bái" },
    ];

    const data: any = dataxx.map((item) => {
      const matched = dataX.find((element) =>
        element.tenTinh.includes(item.tenTinh)
      );
      return {
        id: item.id,
        value: matched ? matched.website ?? 0 : 0,
      };
    });

    // Load bản đồ Việt Nam
    function loadVietnamMap() {
      const currentMap = am5geodataVietnam.default; // Bản đồ Việt Nam
      const title = "Bản đồ Việt Nam";

      if (polygonSeries) {
        polygonSeries.set("geoJSON", currentMap);
        polygonSeries.data.setAll(data);
      } else {
        console.error("Lỗi: polygonSeries chưa được khởi tạo.");
      }

      chart.seriesContainer.children.push(
        am5.Label.new(root, {
          x: 5,
          y: 5,
          text: title,
          background: am5.RoundedRectangle.new(root, {
            fill: am5.color(0xffffff),
            fillOpacity: 0.2,
          }),
        })
      );
    }

    loadVietnamMap(); // Hiển thị bản đồ Việt Nam

    return () => {
      root.dispose(); // Cleanup khi unmount component
    };
  }, []);

  return <div id="chartdivTinh" style={{ width: "100%", height: "500px" }} />;
};

export default DiaPhuongPhanAnh;
