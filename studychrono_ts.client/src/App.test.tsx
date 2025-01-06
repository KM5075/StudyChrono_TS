import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import App from "./App";
import axios from "axios";


//jest.mock("axios", () => {
//  return {
//    get: () => mockGetStudyRecords,

//  };
//});
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


jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: mockData })),
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

  //it('should render "table data"', async () => {
  //  render(
  //    <ChakraProvider value={defaultSystem}>
  //      <App />
  //    </ChakraProvider>
  //  );

  //  expect(screen.getByText('TypeScript')).toBeInTheDocument();
  //  expect(screen.getByText('React')).toBeInTheDocument();
  //  expect(screen.getByText('Next.js')).toBeInTheDocument();
  //});

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

  it('テーブルにデータが表示されること', async () => {

    // const mockData = [
    //   {
    //     id: 1,
    //     title: "TypeScript test",
    //     studyTime: 1,
    //   },
    //   {
    //     id: 2,
    //     title: "React",
    //     studyTime: 2,
    //   },
    //   {
    //     id: 3,
    //     title: "Next.js",
    //     studyTime: 3,
    //   },
    // ];

    // (axios.get as jest.Mock).mockResolvedValue({ data: mockData });
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

});