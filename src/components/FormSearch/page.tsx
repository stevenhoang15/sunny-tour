"use client";
import "./form.css"
const FormSearch = () => {
  return (
    <div className="container">
      <div className="trip-search-section">
        <div className="trip-search-inner white-bg d-flex">
          <div className="input-group">
            <label> Bạn ở đâu? </label>
            <input
              type="text"
              name="departure"
              autoComplete="off"
              placeholder="Điểm khởi hành"
              className="in_dd mod-search-searchword txt_search"
            />
            <input type="hidden" name="location" />
            <div id="show_data" style={{ display: "none" }}>
              <ul></ul>
            </div>
          </div>

          <div className="input-group">
            <label> Bạn muốn đi Tour* </label>
            <input
              type="text"
              name="destination"
              autoComplete="off"
              placeholder="Chọn Tour bạn muốn đi"
              className="in_dd diemden-search-searchword txt_search2"
            />
            <input type="hidden" name="destination" />
            <div id="show_data2" style={{ display: "none" }}>
              <ul></ul>
            </div>
          </div>

          <div className="input-group">
            <label> Số người </label>
            <input type="text" name="people" placeholder="Số người đi" />
          </div>

          <div className="input-group width-col-3">
            <label className="screen-reader-text"> Search </label>
            <input type="submit" name="travel-search" value="Tìm kiếm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSearch;
