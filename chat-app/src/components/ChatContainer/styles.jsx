import styled from 'styled-components';



export const Container = styled.div`
  padding-top: 1rem;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
    }
    .username {
      h3 {
        color: white;
      }
    }
    }
  }
`;
