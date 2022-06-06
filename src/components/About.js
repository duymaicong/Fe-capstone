import React, { useState } from "react";
import paperbg from "../assets/paperbg.jpg";
import bgImg from "../assets/barbershopbg.jpg";
import patterbg from "../assets/patterbg.svg";
import barberreviews from "../assets/barberreviews.jpg"
import suit from "../assets/mens_suite_and_vest_house_of_barbaard_background.jpg"
import barbershop from "../assets/header_barbershop.jpg"


export default function About() {
  const root = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
  };
  const box1 = {
    backgroundImage: `url(${patterbg})`,
    boxShadow: "1px 1px 20px black",
    marginRight: "45%",
    paddingTop: "1%",
    paddingBottom: "1%",
    paddingLeft: "1%",
    paddingRight: "1%",
  };
  const box2 = {
    backgroundImage: `url(${patterbg})`,
    boxShadow: "1px 1px 20px black",
    marginLeft: "45%",
    paddingTop: "1%",
    paddingBottom: "1%",
    paddingLeft: "1%",
    paddingRight: "1%",
  };
  return (
    <div style={root}>
      <div class="column">
        <div style={box1}>
          <h1>Nhu cầu về thời trang tóc ngày một tăng lên theo thời gian</h1>
          <p>
            Đi cùng sự phát triển của xã hội, nhu cầu làm đẹp của mọi người hiện
            đại ngày càng tăng cao cũng như chưa bao giờ có dấu hiệu giảm độ
            nóng. Ngoài quần áo, mỹ phẩm, giày dép,... thì thời trang tóc luôn
            luôn là vấn đề mà mọi người quan tâm. Thế nhưng để tìm được một địa
            chỉ đáng tin cậy để gửi gắm niềm tin thì không phải là một chuyện dễ
            dàng khi mà có vô số các salon tóc được mọc lên mỗi năm nhằm đáp ứng
            nhu cầu này. Và nếu bạn cảm thấy khó khăn trong việc lựa chọn một
            salon làm tóc thật phù hợp thì hãy đến với những địa chỉ làm tóc
            đáng tin cậy ở Hà Nội qua House of Barber.
          </p>
          <h1>Đặt Lịch Hẹn Làm Tóc Online Siêu Tốc là gì ?</h1>
          <p>
            Để tiết kiệm thời gian ngồi chờ khi đi cắt tóc, bạn có thể đặt lịch
            cắt tóc trên ứng dụng HOG một cách đơn giản và tiện lợi.
          </p>
          <p>
            Công nghệ Internet đã và đang thay đổi đời sống và công việc của tất
            cả mọi người , nó trao cho chúng ta sức mạnh để làm mọi điều mình
            muốn .
          </p>
          <p>
            Chúng tôi luôn tự hào là 1 trong những hệ thống salon tóc đầu tiên ở
            Việt Nam tiên phong áp dụng công nghệ cao vào công việc tạo mẫu tóc,
            House of Gentlemen đã và đang nghiên cứu cải tiến và cho ra đời công
            cụ Đặt Lịch Hẹn Online Siêu Tốc ngay trên website chính của mình .
            Với ứng dụng này quý khách có thể đặt lịch hẹn trực tiếp bất cứ lúc
            nào mình muốn và sau đó có thể đánh giá phản hồi về trải nghiệm dịch
            vụ của mình tại salon.
          </p>
        </div>
      </div>

      <br></br>
      <div class="column">
        <div style={box2}>
          <h1>Lợi Ích của đặt lịch hẹn làm tóc trực tuyến</h1>

          <p>
            <b>Thật tuyệt vời vì giờ đây :</b>
            <br />
            + Bạn không còn phải lo lắng liệu đến làm tóc tại salon phải chờ đợi
            làm uổng phí thời gian quý báu của mình thay vào đó bạn có thể dùng
            khoảng thời giạn chờ đợi làm 1 việc gì đó có ích và vui vẻ nhất
            <br />
            + Bạn sẽ ước tính được thời gian làm xong mái tóc của mình để từ đó
            sắp xếp công việc cho hợp lý nhất
            <br />
            + Bạn sẽ biết trước được chi phí mình sẽ đầu tư cho 1 mái tóc đẹp
            tại salon
            <br />
            + Bạn được chọn nhân viên kĩ thuật phục vụ cho mình – người mà bạn
            ưng ý nhất
            <br />
            <b>Đặc Biệt :</b> Khi đặt lịch hẹn trực tuyến các bạn sẽ được giảm
            giá ngay 10% tất cả dịch vụ làm đẹp tại salon chúng tôi
            <br />
            Đó chỉ là 1 phần nhỏ trong số vô vàn những tiện ích khác mà chúng
            tôi muốn gửi gắm đến quý khách hàng của mình trong thời gian sắp tới
          </p>
        </div>
      </div>
    </div>
  );
}
