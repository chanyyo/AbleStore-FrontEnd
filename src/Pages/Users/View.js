import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Menu, Dropdown, Tag, Modal, Button, Breadcrumb } from "antd";
import { DashOutlined } from "@ant-design/icons";
import LikeDisLike from "./LikeDisLike";
import { BOARD_USER_API } from "../../Enum";

function View({ userData, commentUserData, boardId, categoryId, likeData, setRefreshLike }) {
  const TOKEN = sessionStorage.getItem("ACCESS_TOKEN");
  const NICKNAME = sessionStorage.getItem("USER_NICKNAME");
  let history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    await axios
      .delete(`${BOARD_USER_API}/community/categories/${categoryId}/boards/${boardId}`, {
        headers: {
          Authorization: TOKEN,
        },
      })
      .then((res) => {
        if (res) {
          history.push("/forum/1");
        }
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const gotoEdit = () => {
    history.push(`/user/edit/${categoryId}/${boardId}`);
  };

  const { title, content, nickname, code, created_at, tags } = userData;

  const menu = (
    <Menu>
      <Menu.Item>
        <Button onClick={gotoEdit} style={{ border: "none" }}>
          Edit
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button style={{ border: "none" }} onClick={showModal}>
          Delete
        </Button>
        <Modal
          style={{ marginTop: "150px" }}
          visible={isModalVisible}
          cancelText="No"
          okText="Yes"
          onOk={() => handleOk()}
          onCancel={handleCancel}
        >
          <p>Are you sure you want to delete the post?</p>
        </Modal>
      </Menu.Item>

      <Menu.Item>
        <Button onClick={gotoEdit} style={{ border: "none" }}>
          report
        </Button>
      </Menu.Item>
    </Menu>
  );
  const goToPrev = () => {
    history.push(`/forum/${categoryId}`);
  };
  const htmlCode = content;

  return (
    <ViewContainer>
      <Breadcrumb separator=">">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item style={{ cursor: "pointer" }} onClick={goToPrev}>
          <Link> Nas</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{userData.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Header>
        {tags?.map((tag) => {
          return <Tag>{tag}</Tag>;
        })}
        <TitleContainer>
          <Title>{title}</Title>
          <LikeDisLike boardId={boardId} categoryId={categoryId} likeData={likeData} setRefreshLike={setRefreshLike} />
        </TitleContainer>
      </Header>
      <Content>
        <ContentHeader>
          <UserInfo>
            <div className="userInfo">
              <span className="nickname">{nickname?.split("")[0]} </span> {nickname}
              <span>@{code}</span>
            </div>
            <div className="year">
              <span>{created_at?.split("T")[0]}</span>
            </div>
          </UserInfo>
          <UserSet>
            <Li>{commentUserData.length} Replies</Li>
            <Li> {userData.hit} Views</Li>
            <Li>
              {userData.nickname === NICKNAME && (
                <Dropdown overlay={menu}>
                  <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                    <DashOutlined />
                  </a>
                </Dropdown>
              )}
            </Li>
          </UserSet>
        </ContentHeader>
        <ContentBody>
          <div dangerouslySetInnerHTML={{ __html: htmlCode }}></div>
        </ContentBody>
      </Content>
    </ViewContainer>
  );
}

export default View;

const ViewContainer = styled.div`
  width: 1200px;
  margin: 50px auto;
  height: 600px;
  overflow-y: auto;
`;
const Header = styled.header`
  margin-bottom: 5px;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  font-weight: 600;
  color: #000;
  font-size: 24px;
  line-height: 34px;
`;
const Like = styled.div``;
const Content = styled.div``;
const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const UserSet = styled.ul`
  display: flex;
`;

const Li = styled.li`
  margin-left: 20px;
`;

const UserInfo = styled.div`
  margin: 10px 0;
  .userInfo {
    margin-bottom: 20px;
  }
  .nickname {
    padding: 12px;
    border-radius: 50%;
    border: 1px solid #dadada;
    background-color: #dadada;
    color: #fff;
    font-weight: 700;
  }
`;

const ContentBody = styled.div``;
