import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState } from "react";
import s from "./index.module.scss";
import { Button } from "ui";

export const WagmiTest = () => {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  const [value, setValue] = useState("Какие-то данные...");
  const { data: signature, isError, isSuccess, signMessage, reset } = useSignMessage();

  const signMyMessage = async (message: string) => {
    await signMessage({ message });
  };

  return (
    <>
      {account.addresses ? (
        <div>
          <input
            type="text"
            value={value}
            className={s.input}
            onChange={(e) => {
              reset();
              setValue(e.target.value);
            }}
          />
          <Button type="button" onClick={() => signMyMessage(value)}>
            {signature ? "Try again" : "Sign a message"}
          </Button>
          <br />
          {(isSuccess || isError) && (
            <div style={{ padding: "1rem 0" }}>
              {isSuccess && <div>Подпись: {signature}</div>}
              {isError && <div>Ошибка при подписании</div>}
            </div>
          )}
          <hr />
          <h1>Account!</h1>
          <p>
            status: {account.status}
            <br />
            addresses: {JSON.stringify(account.addresses)}
            <br />
            chainId: {account.chainId}
          </p>

          {account.status === "connected" && (
            <>
              <Button type="button" onClick={() => disconnect()}>
                Disconnect
              </Button>
            </>
          )}
        </div>
      ) : (
        <div>
          {connectors.length ? (
            <>
              {connectors.map((connector) => (
                <p key={connector.uid}>
                  <Button onClick={() => connect({ connector })} type="button">
                    {connector.name}
                  </Button>
                </p>
              ))}
              <div>{status != "idle" && status}</div>
              <div>{error?.message}</div>
            </>
          ) : (
            <div>You don&#39;t have any connectors</div>
          )}
        </div>
      )}
      <hr />
      <br />
      <ConnectButton />
    </>
  );
};
