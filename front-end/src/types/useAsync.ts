import { useState, useEffect } from "react";

interface AsyncState<T> {
  loading: boolean;
  error: string | null;
  data: T | null;
}
//`T`값은 어떤 데이터든 받을 수 있게 만들어둔 것
//useAsync는 비동기 함수를 받아서 그 결과를 관리하는 역할임

export const useAsync = <T>(asyncFunction: () => Promise<T>): AsyncState<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);


  useEffect(() => {
    const execute = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await asyncFunction();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    execute();
  }, [asyncFunction]);

  return { loading, error, data };
};

//로딩 true값, 에러와 데이터는 null값임 -> 데이터를 성공적으로 불러왔다면 setData에 저장
//다만 에러 발생 시 에러와 에러메시지를 보여줌, 그리고 로딩도 실패(fasle)로 됨.