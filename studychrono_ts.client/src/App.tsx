import { Box, ChakraProvider, Heading, Table, useDisclosure } from '@chakra-ui/react';
import theme from './theme/theme';
import PrimaryButton from './components/atoms/PrimaryButton';
import { StudyRecord } from './types/api/StudyRecord';
import { useEffect, useState, } from 'react';
import { toaster, Toaster } from './components/ui/toaster';
import { useForm } from 'react-hook-form';
import StudyRecordDetail from './components/organisms/StudyRecordDetail';
import axios from 'axios';
import { getStudyRecords } from './utils/ApiAccess';
import { EditIconButton } from './components/atoms/EditIconButton';
import { DeleteIconButton } from './components/atoms/DeleteIconButton';

function App() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<StudyRecord>({
    criteriaMode: "all",
    defaultValues: {
      id: 0,
      title: "",
      studyTime: 0,
    },
  });
  const [studyRecords, setStudyRecords] = useState<Array<StudyRecord>>([]);
  const [loadig, setLoading] = useState<boolean>(true);
  const { open, onOpen, onClose, onToggle } = useDisclosure();
  const [modalTitle, setModalTitle] = useState<string>("");

  useEffect(() => {
    const getAllRecords = async () => {
      const records = await getStudyRecords();
      setStudyRecords(records);
      setLoading(false);
    }

    getAllRecords();
  }, []);

  /**
   * @function Submit処理
   * @param data
   */
  const onSubmitFunc = handleSubmit((data: StudyRecord) => {
    console.log(data);
    if (isEdit) {
      onSubmitEdit();
    } else {
      onSubmitAdd();
    }
  });



  /**
  * 新規登録処理
  */
  const onSubmitAdd = handleSubmit((data: StudyRecord) => {

    console.log('Start adding');
    axios.post<StudyRecord>("api/studyrecord", data).then((res) => {
      console.log(res.data);
      const newRecord = res.data;
      setStudyRecords([...studyRecords, newRecord]);
      reset();
      onClose();
      toaster.create({
        title: "新規登録",
        description: "学習記録を新規登録しました。",
        type: "success",
      });
    });
  });

  /**
   * 編集処理
   */
  const onSubmitEdit = handleSubmit((data: StudyRecord) => {
    console.log(data);
    axios.put<StudyRecord>(`api/studyrecord/${data.id}`, data).then((res) => {
      console.log('Start updating');
      console.log(res.data);
      const updatedRecord = res.data;
      console.log(updatedRecord);
      const newStudyRecords = studyRecords.map((record) => {
        if (record.id === updatedRecord.id) {
          return updatedRecord;
        }
        return record;
      });
      console.log(newStudyRecords);
      console.log('End updating');
      onClose();
      console.log('Close dialog');
      setStudyRecords(newStudyRecords);
      toaster.create({
        title: "更新完了",
        description: "学習記録を更新しました",
        type: "success",
      });

    });
  });


  /**
   * 編集ボタンクリック時の処理
   * @param id
   * @returns
   * */
  const onClickEdit = (id: number) => {
    console.log('Edit button clicked');
    const targetRecord = studyRecords.find((record) => record.id === id);
    if (targetRecord) {
      console.log('Record found');
      setModalTitle("学習記録編集");
      setIsEdit(true);
      reset(targetRecord);
      onOpen();
      console.log('Dialog opened');
    }
    else {
      console.log('Record not found');
    }
  }

  /**
   * 新規登録ボタンクリック時の処理
   */
  const onClickAdd = () => {
    setModalTitle("新規登録");
    setIsEdit(false);
    reset({
      id: 0,
      title: "",
      studyTime: 0,
    });
    onOpen();
  }


  /**
   * 削除ボタンクリック時の処理
   * @param id
   * @returns
   * */
  const onClickDelete = (id: number) => {
    axios.delete(`api/studyrecord/${id}`).then((res) => {
      console.log(res.data);
    });
    const newStudyRecords = studyRecords.filter((record) => record.id !== id);
    setStudyRecords(newStudyRecords);
    toaster.create({
      title: "削除完了",
      description: "学習記録を削除しました",
      type: "success",
    });
  }

  return (
    <>
      <ChakraProvider value={theme}>
        <Toaster />
        <br />
        <Box px={{ base: 4, sm: 50, xl: 400 }} py={10}>
          <Heading as="h1" size="4xl" mb={4} color={"teal"}>Study Chrono</Heading>
          <br />
          {loadig ?
            <p>ローディング中...</p>
            :
            <Table.Root variant="line" data-testid="table">
              <Table.Header>
                <Table.Row bg={"teal.50"}>
                  <Table.ColumnHeader>Title</Table.ColumnHeader>
                  <Table.ColumnHeader>Study Time(h)</Table.ColumnHeader>
                  <Table.ColumnHeader></Table.ColumnHeader>
                  <Table.ColumnHeader></Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {studyRecords.map((record) => (
                  <Table.Row key={record.id} _hover={{ bg: "gray.100" }}>
                    <Table.Cell>{record.title}</Table.Cell>
                    <Table.Cell>{record.studyTime}</Table.Cell>
                    <Table.Cell><EditIconButton onClick={() => onClickEdit(record.id)} /></Table.Cell>
                    <Table.Cell><DeleteIconButton onClick={() => onClickDelete(record.id)} /></Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          }
          <br />
          <PrimaryButton onClick={onClickAdd}>新規登録</PrimaryButton>
          <StudyRecordDetail open={open} title={modalTitle} onToggle={onToggle} onSubmit={onSubmitFunc} errors={errors} register={register} />
        </Box>
      </ChakraProvider>
    </>
  );

}

export default App;