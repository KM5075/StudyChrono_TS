import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import App from "./App";

const mockData = [
  {
    id: 1,
    title: "TypeScript-mock",
    studyTime: 1,
  },
  {
    id: 2,
    title: "React-mock",
    studyTime: 2,
  },
  {
    id: 3,
    title: "Next.js-mock",
    studyTime: 3,
  },
];

const mockUpdatedData = {
  id: 2,
  title: "React-mock-updated",
  studyTime: 1,
}

const mockAddNewData = {
  id: 4,
  title: "Vue.js",
  studyTime: 3,
}

const mockDeleteData = {
  id: 1,
  title: "TypeScript-mock",
  studyTime: 1,
}

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: mockData })),
  put: jest.fn(() => Promise.resolve({ data: mockUpdatedData })),
  post: jest.fn(() => Promise.resolve({ data: mockAddNewData })),
  delete: jest.fn(() => Promise.resolve({ data: mockDeleteData })),
}));



describe('App Page Test', () => {
  beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = false;
  });

  it('should render "title"', async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    );

    expect(screen.getByText('Study Chrono')).toBeInTheDocument();
  });

  it('should render "table header"', async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    );
    await waitFor(() => screen.getByTestId("table"));

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Study Time(h)')).toBeInTheDocument();
  });

  it('should render "Add Button"', async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    );

    expect(screen.getByText('新規登録')).toBeInTheDocument();
  });

  it('should render "Add Modal"', async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    );

    // モーダルが非表示であるか確認
    expect(screen.queryByText('Cancel')).toBeNull();

    // ボタンの取得
    const button = screen.getByText('新規登録');

    // ボタンクリック
    userEvent.click(button);


    // モーダルが表示されているか確認
    await waitFor(() => {
      const modalTitle = screen.getByRole("heading", {
        name: /新規登録/i,
      });
      expect(modalTitle).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });
  });

  it('should render "Title is empty error"', async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    );

    // ボタンの取得
    const button = screen.getByText('新規登録');

    // ボタンクリック
    userEvent.click(button);

    // 登録ボタンの取得
    const submitButton = await screen.findByText('登録');
    userEvent.click(submitButton);

    expect(await screen.findByText('Title is required')).toBeInTheDocument();
  });

  it('should render "Study time is less than 0 error"', async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    );
    // 初期状態でエラーメッセージが表示されていないことを確認
    expect(screen.queryByText('Time must be greater than 0')).not.toBeInTheDocument();

    // ボタンの取得
    const button = screen.getByText('新規登録');

    // ボタンクリック
    userEvent.click(button);

    // 登録ボタンの取得
    const submitButton = await screen.findByText('登録');
    userEvent.click(submitButton);

    expect(await screen.findByText('Time must be greater than 0')).toBeInTheDocument();
  });

  it('should render Table data', async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    );

    await waitFor(() => { screen.getByTestId("table"); });
    const records = screen.getByTestId("table").querySelectorAll("tbody tr");
    screen.debug();

    expect(records.length).toBe(3);
  });

  // it('should render add data', async () => {
  //   render(
  //     <ChakraProvider value={defaultSystem}>
  //       <App />
  //     </ChakraProvider>
  //   );

  //   await waitFor(() => { screen.getByTestId("table"); });

  //   const button = screen.getByText('新規登録');
  //   userEvent.click(button);

  //   await waitFor(() => {
  //     const modalTitle = screen.getByRole("heading", {
  //       name: /新規登録/i,
  //     });
  //     expect(modalTitle).toBeInTheDocument();
  //     expect(screen.getByText('Cancel')).toBeInTheDocument();
  //   });

  //   const titleInput = screen.getByTestId("input-title");
  //   const timeInput = screen.getByTestId("input-time");

  //   userEvent.type(titleInput, "Vue.js");

  //   fireEvent.change(timeInput, { target: { value: '3' } });

  //   const submitButton = screen.getByText("登録");
  //   fireEvent.click(submitButton);
  //   // userEvent.click(submitButton);

  //   await waitFor(() => {
  //     expect(screen.queryByText('Cancel')).toBeNull();
  //   });

  //   await waitFor(() => {
  //     screen.getByTestId("Vue.js");
  //   });

  //   expect(screen.getByText("Vue.js")).toBeInTheDocument();
  // });

  // it('should render updated data', async () => {
  //   render(
  //     <ChakraProvider value={defaultSystem}>
  //       <App />
  //     </ChakraProvider>
  //   );

  //   await waitFor(() => { screen.getByTestId("table"); });

  //   const records = screen.getByTestId("table").querySelectorAll("tbody tr");
  //   const updateButton = records[1].querySelector("button");
  //   expect(updateButton).not.toBeNull();
  //   userEvent.click(updateButton as Element);


  //   await waitFor(() => {
  //     const modalTitle = screen.getByRole("heading", {
  //       name: /新規登録/i,
  //     });
  //     expect(modalTitle).toBeInTheDocument();
  //     expect(screen.getByText('Cancel')).toBeInTheDocument();
  //   });


  //   // const titleInput = screen.getByLabelText("新規登録");
  //   // const timeInput = screen.getByLabelText("Study Time(h)");
  //   const titleInput = screen.getByTestId("input-title");
  //   const timeInput = screen.getByTestId("input-time");

  //   userEvent.clear(titleInput);
  //   userEvent.type(titleInput, "React-mock-updated");

  //   userEvent.clear(timeInput);
  //   fireEvent.change(timeInput, { target: { value: '10' } });

  //   // userEvent.type(timeInput, { target: { value: '1' } });

  //   const submitButton = screen.getByText("登録");
  //   console.log(submitButton);
  //   userEvent.click(submitButton);

  //   // モーダルが非表示になるまで待機
  //   await waitFor(() => {
  //     expect(screen.queryByText('Cancel')).toBeNull();
  //   }, { timeout: 5000 });

  //   await waitFor(() => {
  //     // expect(screen.queryByText('Cancel')).toBeNull();

  //     screen.getByTestId("React-mock-updated");

  //     // テキストが複数の要素に分割されている場合に対応するため、関数を使用してマッチング
  //     // expect(screen.getByText((content, element) => {
  //     //   return element?.textContent === "React-mock-updated";
  //     // })).toBeInTheDocument();

  //   });
  //   screen.debug();

  //   expect(screen.getByText("React-mock-updated")).toBeInTheDocument();
  // }, 10000);

  it('should wait for modal to disappear', async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    );

    // ボタンの取得
    const button = screen.getByText('新規登録');

    // ボタンクリック
    userEvent.click(button);

    // モーダルが表示されているか確認
    await waitFor(() => {
      const modalTitle = screen.getByRole("heading", {
        name: /新規登録/i,
      });
      expect(modalTitle).toBeInTheDocument();
    });

    // モーダルを閉じる
    const cancelButton = screen.getByText('Cancel');
    userEvent.click(cancelButton);

    // モーダルが非表示になるまで待機
    await waitFor(() => {
      expect(screen.queryByText('Cancel')).toBeNull();
    });
  });

  it('should render delete data', async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    );

    await waitFor(() => { screen.getByTestId("table"); });

    const records = screen.getByTestId("table").querySelectorAll("tbody tr");
    const deleteButton = records[0].querySelectorAll("button");
    expect(deleteButton[1]).not.toBeNull();
    userEvent.click(deleteButton[1] as Element);

    await waitFor(() => {
      expect(screen.queryByText('TypeScript-mock')).toBeNull();
    });
  });

});