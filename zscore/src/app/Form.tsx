"use client";
import { Button } from "@/components/Button";
import Table from "@/components/Table";
import Input from "@/components/form-elements/Input";
import { Option, Select } from "@/components/form-elements/Select";
import districts from "../districts.json";
import streams from "../streams.json";
import useAnalyze from "./api/useAnalyze";
import zscores from "../zscores.json";
import { useEffect, useState } from "react";

const Form = () => {
  const { mutateAsync: analyze, isPending } = useAnalyze();
  const [district, setDistrict] = useState<undefined | string>(undefined);
  const [stream, setStream] = useState<undefined | string>(undefined);
  const [zscore, setZscore] = useState<string>("");
  const [result, setResult] = useState<null | number[]>(null);
  const [error, setError] = useState<null | string>(null);

  const [filteredResults, setFilteredResults] = useState<typeof zscores>([]);

  useEffect(() => {
    if (result && result?.length > 0) {
      const rows = zscores
        .filter(
          (v) =>
            v.district === parseInt(district!) &&
            v.stream === parseInt(stream!) &&
            result.includes(v.course) &&
            v.o_zscore !== -100 &&
            v.o_zscore <= parseFloat(zscore) + 0.01
        )
        .sort((a, b) => b.zscore - a.zscore);
      setFilteredResults(rows);
    } else {
      setFilteredResults([]);
    }
  }, [result]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        if (district && stream && zscore) {
          const r = await analyze({
            district: parseInt(district || "0"),
            zscore: parseFloat(zscore || "0") * 10000,
          });
          setResult(r);
        } else {
          setError("Please fill the all the fields.");
        }
      }}
      className="mt-10 p-3 w-full max-w-3xl rounded-xl border "
    >
      <div className="flex items-center flex-col md:flex-row gap-5">
        <Select
          className="w-full"
          label="District"
          placeholder="Select a district"
          value={district}
          onValueChange={(v) => {
            setError(null);
            setDistrict(v);
            setResult([]);
          }}
        >
          {districts.map((district) => (
            <Option key={district.value} value={district.value.toString()}>
              {district.name}
            </Option>
          ))}
        </Select>

        <Select
          value={stream}
          onValueChange={(v) => {
            setError(null);
            setStream(v);
            setResult([]);
          }}
          className="w-full"
          label="Steam"
          placeholder="Select a stream"
        >
          {streams.map((stream) => (
            <Option key={stream.value} value={stream.value.toString()}>
              {stream.name}
            </Option>
          ))}
        </Select>

        <Input
          value={zscore}
          onChange={(e) => {
            setError(null);
            setZscore(e.target.value);
            setResult([]);
          }}
          className="w-full"
          label="Z-Score"
          placeholder="Enter your z-score."
        />
      </div>

      <Button
        type="submit"
        isSpinning={isPending}
        wrapperClass="w-full mt-5"
        className={"w-full flex items-center justify-center"}
      >
        Analyze
      </Button>
      {error && <p className="text-xs mt-1 text-red-600">{error}</p>}

      {!isPending && filteredResults && filteredResults?.length > 0 && (
        <div className="mt-10">
          <h3 className="text-base text-center text-gray-800">
            Available courses in{" "}
            <span className="font-medium">
              {districts.find((d) => d.value === parseInt(district!))!.name}
            </span>{" "}
            district for{" "}
            <span className="font-medium">
              {streams.find((d) => d.value === parseInt(stream!))!.name}
            </span>{" "}
            stream.
          </h3>

          <p className="text-xs text-center text-gray-500 italic">
            Results are not very accurate as the data set is minimal.
          </p>
          <Table
            className="mt-5 rounded-xl shadow-none"
            tableHeadClass="bg-gray-800 text-white border border-gray-800 border-b-0"
            headings={["z-score", "course", "university"]}
            datas={filteredResults.map((r) => {
              const row = [];
              row.push(<div>{r.o_zscore}</div>);
              row.push(<div>{r.course_name}</div>);
              row.push(<div>{r.university_name}</div>);
              return row;
            })}
          ></Table>
        </div>
      )}
    </form>
  );
};

export default Form;
